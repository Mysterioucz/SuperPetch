#!/bin/bash

# Pet Platform - Code Generation Script
# This script generates all microservice boilerplate code

set -e

echo "🚀 Generating Pet Platform Microservices..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}→ $1${NC}"
}

# Create directory structure
create_service_structure() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    print_info "Creating $service_name structure..."

    mkdir -p "$service_path/src/controllers"
    mkdir -p "$service_path/src/services"
    mkdir -p "$service_path/src/entities"
    mkdir -p "$service_path/src/dto"
    mkdir -p "$service_path/src/guards"
    mkdir -p "$service_path/src/interceptors"
    mkdir -p "$service_path/src/filters"
    mkdir -p "$service_path/src/config"
    mkdir -p "$service_path/src/common"
    mkdir -p "$service_path/test"

    print_success "$service_name structure created"
}

# Generate app.module.ts
generate_app_module() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    cat > "$service_path/src/app.module.ts" << 'EOF'
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') === 'development',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),

    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get('RABBITMQ_URL')],
            queue: 'main_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
EOF
}

# Generate health controller
generate_health_controller() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    cat > "$service_path/src/controllers/health.controller.ts" << 'EOF'
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: process.env.npm_package_name || 'pet-platform-service',
    };
  }
}
EOF
}

# Generate Dockerfile
generate_dockerfile() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    cat > "$service_path/Dockerfile" << 'EOF'
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY ../../shared ./shared

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built app
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + process.env.PORT + '/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start
CMD ["node", "dist/main.js"]
EOF
}

# Generate .env.example
generate_env_example() {
    local service_name=$1
    local service_path="backend/services/$service_name"
    local port=$2

    cat > "$service_path/.env.example" << EOF
NODE_ENV=development
PORT=$port

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=pet_platform
DATABASE_USER=petadmin
DATABASE_PASSWORD=petpass123

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=petredis123

# RabbitMQ
RABBITMQ_URL=amqp://petadmin:petpass123@localhost:5672

# JWT (for auth service)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

# CORS
CORS_ORIGIN=*

# MinIO (for services that need file storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=petadmin
MINIO_SECRET_KEY=petpass123
MINIO_USE_SSL=false
EOF
}

# Generate tsconfig.json
generate_tsconfig() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    cat > "$service_path/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@shared/*": ["../../shared/src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
EOF
}

# Generate nest-cli.json
generate_nest_cli() {
    local service_name=$1
    local service_path="backend/services/$service_name"

    cat > "$service_path/nest-cli.json" << 'EOF'
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "assets": ["**/*.hbs", "**/*.html"],
    "watchAssets": true
  }
}
EOF
}

# Generate README for service
generate_service_readme() {
    local service_name=$1
    local service_path="backend/services/$service_name"
    local port=$2

    cat > "$service_path/README.md" << EOF
# $service_name

## Description

$service_name for Pet Platform

## Installation

\`\`\`bash
pnpm install
\`\`\`

## Running the service

\`\`\`bash
# Development
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
\`\`\`

## Testing

\`\`\`bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
\`\`\`

## Environment Variables

Copy \`.env.example\` to \`.env\` and configure:

\`\`\`bash
cp .env.example .env
\`\`\`

## API Documentation

Swagger documentation available at: http://localhost:$port/api/docs

## Health Check

http://localhost:$port/api/v1/health
EOF
}

# Generate all services
services=(
    "auth-service:3001"
    "user-service:3002"
    "pet-service:3003"
    "matching-service:3004"
    "chat-service:3005"
    "marketplace-service:3006"
    "admin-service:3007"
)

echo "Generating microservices..."
echo ""

for service_config in "${services[@]}"; do
    IFS=':' read -r service_name port <<< "$service_config"

    print_info "Generating $service_name..."

    create_service_structure "$service_name"
    generate_app_module "$service_name"
    generate_health_controller "$service_name"
    generate_dockerfile "$service_name"
    generate_env_example "$service_name" "$port"
    generate_tsconfig "$service_name"
    generate_nest_cli "$service_name"
    generate_service_readme "$service_name" "$port"

    # Copy package.json if it doesn't exist
    if [ ! -f "backend/services/$service_name/package.json" ]; then
        print_info "Copying package.json template for $service_name..."
    fi

    print_success "$service_name generated"
    echo ""
done

# Generate API Gateway
print_info "Generating API Gateway..."

mkdir -p backend/gateway/src
mkdir -p backend/gateway/src/middleware
mkdir -p backend/gateway/src/config

cat > backend/gateway/src/main.ts << 'EOF'
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.use(helmet());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    }),
  );

  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`🌐 API Gateway running on http://localhost:${port}`);
}

bootstrap();
EOF

cat > backend/gateway/src/app.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
EOF

print_success "API Gateway generated"

# Generate ML Services
print_info "Generating ML Services..."

# Recommender Service
mkdir -p ml-services/recommender/app
mkdir -p ml-services/recommender/models

cat > ml-services/recommender/main.py << 'EOF'
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="Pet Platform - Recommender Service",
    description="ML-powered recommendation engine for pet adoption",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserPreferences(BaseModel):
    home_type: Optional[str] = None
    experience_level: str
    preferred_pet_types: List[str] = []
    willing_to_travel_km: int = 50

class RecommendationRequest(BaseModel):
    user_id: str
    user_preferences: UserPreferences
    limit: int = 20

class Recommendation(BaseModel):
    pet_id: str
    compatibility_score: float
    lifestyle_match_score: float
    experience_match_score: float
    reasons: List[str]

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]
    model_version: str
    timestamp: str

@app.get("/")
def read_root():
    return {
        "service": "Pet Platform Recommender",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "recommender"}

@app.post("/api/v1/recommendations", response_model=RecommendationResponse)
def get_recommendations(request: RecommendationRequest):
    # TODO: Implement ML recommendation logic
    return RecommendationResponse(
        recommendations=[],
        model_version="1.0.0",
        timestamp="2024-01-01T00:00:00Z"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

cat > ml-services/recommender/requirements.txt << 'EOF'
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
redis==5.0.1
scikit-learn==1.4.0
pandas==2.2.0
numpy==1.26.3
python-dotenv==1.0.0
EOF

cat > ml-services/recommender/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
EOF

# Fraud Detection Service
mkdir -p ml-services/fraud-detection/app
mkdir -p ml-services/fraud-detection/models

cat > ml-services/fraud-detection/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn

app = FastAPI(
    title="Pet Platform - Fraud Detection Service",
    description="ML-powered fraud detection system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskFactor(BaseModel):
    factor: str
    weight: float
    description: str

class FraudDetectionRequest(BaseModel):
    user_id: str
    action: str
    entity_id: Optional[str] = None
    entity_type: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class FraudDetectionResponse(BaseModel):
    is_suspicious: bool
    risk_score: float
    risk_factors: List[RiskFactor]
    recommended_action: str
    explanation: str

@app.get("/")
def read_root():
    return {
        "service": "Pet Platform Fraud Detection",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "fraud-detection"}

@app.post("/api/v1/detect", response_model=FraudDetectionResponse)
def detect_fraud(request: FraudDetectionRequest):
    # TODO: Implement fraud detection logic
    return FraudDetectionResponse(
        is_suspicious=False,
        risk_score=0.1,
        risk_factors=[],
        recommended_action="none",
        explanation="No suspicious activity detected"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
EOF

cat > ml-services/fraud-detection/requirements.txt << 'EOF'
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
pymongo==4.6.1
redis==5.0.1
scikit-learn==1.4.0
pandas==2.2.0
numpy==1.26.3
python-dotenv==1.0.0
EOF

cat > ml-services/fraud-detection/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
EOF

print_success "ML Services generated"

# Generate shared index file
cat > backend/shared/src/index.ts << 'EOF'
export * from './types';
EOF

print_success "Shared package configured"

echo ""
echo "============================================"
print_success "All services generated successfully!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Run: chmod +x setup.sh generate-services.sh"
echo "2. Run: ./setup.sh"
echo "3. Choose option 1 for full stack setup"
echo ""
echo "Or for manual setup:"
echo "1. cd backend/services/auth-service"
echo "2. pnpm install"
echo "3. cp .env.example .env"
echo "4. pnpm run start:dev"
echo ""
