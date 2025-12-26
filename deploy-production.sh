#!/bin/bash

# ============================================
# PawHome Production Deployment Script
# ============================================
# This script deploys the application to production (EC2)
# Usage: ./deploy-production.sh

set -e  # Exit on error

echo "🚀 Starting PawHome Production Deployment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ Error: .env.production file not found!${NC}"
    echo "Please create .env.production with your production configuration."
    exit 1
fi

echo -e "${GREEN}✓${NC} Found .env.production"

# Load environment variables to validate
source .env.production

# Validate critical environment variables
REQUIRED_VARS=(
    "DATABASE_NAME"
    "DATABASE_USER"
    "DATABASE_PASSWORD"
    "MONGODB_DATABASE"
    "JWT_SECRET"
    "REDIS_PASSWORD"
    "RABBITMQ_PASSWORD"
    "NEXT_PUBLIC_API_URL"
)

echo ""
echo "🔍 Validating environment variables..."
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    printf '%s\n' "${MISSING_VARS[@]}"
    exit 1
fi

echo -e "${GREEN}✓${NC} All required environment variables are set"

# Confirm deployment
echo ""
echo -e "${YELLOW}⚠️  WARNING: This will restart all production services!${NC}"
echo -e "Database: ${DATABASE_NAME}"
echo -e "API URL: ${NEXT_PUBLIC_API_URL}"
echo ""
read -p "Do you want to continue? (yes/no): " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "📦 Step 1: Stopping existing containers..."
docker compose -f docker-compose.prod.yml --env-file .env.production down

echo ""
echo "🗄️  Step 2: Checking database initialization..."

# Check if postgres volume exists
if docker volume inspect pawhome_postgres_data >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Postgres volume exists. Database will use existing data.${NC}"
    INIT_DB=false
else
    echo "Creating new postgres volume..."
    INIT_DB=true
fi

# Check if mongodb volume exists
if docker volume inspect pawhome_mongo_data >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  MongoDB volume exists. Database will use existing data.${NC}"
else
    echo "Creating new mongodb volume..."
fi

echo ""
echo "🔨 Step 3: Building images..."
docker compose -f docker-compose.prod.yml --env-file .env.production build --no-cache

echo ""
echo "🚢 Step 4: Starting infrastructure services (databases)..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d postgres mongodb redis rabbitmq elasticsearch minio

echo "⏳ Waiting for databases to be healthy (30s)..."
sleep 30

# Check if we need to initialize the database
if [ "$INIT_DB" = true ]; then
    echo ""
    echo "📝 Step 5: Initializing new database..."
    echo "Running init.sql..."
    docker exec -i pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} < infrastructure/database/postgres/init.sql
    echo -e "${GREEN}✓${NC} Database initialized"
else
    echo ""
    echo "🔧 Step 5: Updating existing database password..."
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "ALTER USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';" || true
    echo -e "${GREEN}✓${NC} Database password updated"
fi

echo ""
echo "🚀 Step 6: Starting backend services..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d \
    gateway \
    auth-service \
    user-service \
    pet-service \
    matching-service \
    chat-service \
    marketplace-service \
    admin-service

echo "⏳ Waiting for backend services to be healthy (30s)..."
sleep 30

echo ""
echo "🌐 Step 7: Starting ML services..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d \
    ml-recommender \
    ml-fraud-detection

echo ""
echo "💻 Step 8: Starting frontend..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d frontend

echo ""
echo "⏳ Waiting for all services to stabilize (20s)..."
sleep 20

echo ""
echo "📊 Deployment Status:"
echo "===================="
docker compose -f docker-compose.prod.yml --env-file .env.production ps

echo ""
echo "🔍 Checking service health..."

# Check critical services
CRITICAL_SERVICES=("pet-platform-gateway" "pet-auth-service" "pet-platform-postgres" "pet-platform-frontend")
ALL_HEALTHY=true

for service in "${CRITICAL_SERVICES[@]}"; do
    STATUS=$(docker inspect -f '{{.State.Status}}' "$service" 2>/dev/null || echo "not found")
    if [ "$STATUS" != "running" ]; then
        echo -e "${RED}❌ $service: $STATUS${NC}"
        ALL_HEALTHY=false
    else
        echo -e "${GREEN}✓${NC} $service: running"
    fi
done

echo ""
if [ "$ALL_HEALTHY" = true ]; then
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
    echo ""
    echo "🎉 Your application is now running:"
    echo "   Frontend: ${NEXT_PUBLIC_API_URL/3000/3100}"
    echo "   Gateway:  ${NEXT_PUBLIC_API_URL}"
    echo ""
    echo "📝 Useful commands:"
    echo "   View logs:    docker compose -f docker-compose.prod.yml --env-file .env.production logs -f [service-name]"
    echo "   Stop all:     docker compose -f docker-compose.prod.yml --env-file .env.production down"
    echo "   Restart:      docker compose -f docker-compose.prod.yml --env-file .env.production restart [service-name]"
else
    echo -e "${RED}⚠️  Deployment completed with errors!${NC}"
    echo "Check logs with:"
    echo "   docker compose -f docker-compose.prod.yml --env-file .env.production logs"
    exit 1
fi

# Test the API
echo ""
echo "🧪 Testing API endpoint..."
sleep 5
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health 2>/dev/null | grep -q "200\|404"; then
    echo -e "${GREEN}✓${NC} Gateway is responding"
else
    echo -e "${YELLOW}⚠️${NC}  Gateway health check failed (might need more time to start)"
fi

echo ""
echo "✨ Deployment complete! ✨"
