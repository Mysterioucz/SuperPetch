# 🐾 Pet Adoption & Breeding Platform

A comprehensive microservices-based platform for pet adoption, breeding matching, and pet service marketplace with AI-powered recommendations.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Services](#services)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [ML Services](#ml-services)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Mobile (iOS) │  │ Mobile (And) │  │  Web App     │         │
│  │   Flutter    │  │   Flutter    │  │   Next.js    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY                                │
│              (Rate Limiting, Auth, Routing)                      │
│                     Port: 3000                                   │
└────────────────────────────┬─────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Service │    │ User Service │    │  Pet Service │
│   Port:3001  │    │   Port:3002  │    │   Port:3003  │
└──────────────┘    └──────────────┘    └──────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│Match Service │    │ Chat Service │    │Marketplace   │
│   Port:3004  │    │   Port:3005  │    │   Port:3006  │
└──────────────┘    └──────────────┘    └──────────────┘
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │   MongoDB    │    │  ElasticSrch │
│  (Main DB)   │    │ (Chat/Logs)  │    │   (Search)   │
└──────────────┘    └──────────────┘    └──────────────┘
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ML SERVICES (Python/FastAPI)                │
│  ┌──────────────────────┐  ┌─────────────────────────┐         │
│  │  Recommender System  │  │  Fraud Detection        │         │
│  │     Port: 8000       │  │      Port: 8001         │         │
│  └──────────────────────┘  └─────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Web**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Mobile**: Flutter (iOS/Android)

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Architecture**: Microservices
- **API Style**: REST + GraphQL (for feeds)
- **Authentication**: JWT + OAuth2 (Google, Apple, LINE)

### Databases
- **PostgreSQL 16**: Primary relational database
  - Users, Pets, Matches, Reviews, Marketplace
- **MongoDB 7**: Document storage
  - Chat messages, Activity logs, Audit trails
- **Redis 7**: Caching & session management
- **Elasticsearch 8**: Full-text search

### Message Queue
- **RabbitMQ**: Inter-service communication

### Storage
- **MinIO**: S3-compatible object storage for media files

### ML/AI
- **Python FastAPI**: ML service APIs
- **Libraries**: scikit-learn, TensorFlow/PyTorch
- **Features**:
  - Adoption recommendation engine
  - Breeding compatibility analysis
  - Fraud detection
  - Trust score calculation

### DevOps
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (production)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

---

## 📁 Project Structure

```
prem/
├── app/                          # Next.js frontend pages
├── backend/
│   ├── gateway/                  # API Gateway service
│   ├── services/
│   │   ├── auth-service/         # Authentication & Authorization
│   │   ├── user-service/         # User profiles & preferences
│   │   ├── pet-service/          # Pet management & listings
│   │   ├── matching-service/     # Swipe & matching logic
│   │   ├── chat-service/         # Real-time messaging
│   │   ├── marketplace-service/  # Business & services
│   │   └── admin-service/        # Moderation & admin tools
│   └── shared/                   # Shared types, utilities, DTOs
├── ml-services/
│   ├── recommender/              # ML recommendation engine
│   └── fraud-detection/          # Fraud detection system
├── infrastructure/
│   ├── database/
│   │   ├── postgres/             # SQL schemas & migrations
│   │   └── mongodb/              # MongoDB initialization
│   ├── k8s/                      # Kubernetes manifests
│   └── terraform/                # Infrastructure as Code
├── docker-compose.yml            # Local development setup
└── PROJECT_README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker** 24+ & Docker Compose 2.20+
- **Node.js** 20+ (for local development)
- **pnpm** 8+ (package manager)
- **Python** 3.11+ (for ML services)

### Quick Start (All Services)

```bash
# Clone the repository
cd prem

# Start all services with Docker Compose
docker-compose up -d

# Wait for services to be healthy (2-3 minutes)
docker-compose ps

# Check service health
curl http://localhost:3000/health  # API Gateway
curl http://localhost:3001/health  # Auth Service
```

### Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3100 | Next.js web app |
| API Gateway | http://localhost:3000 | Main API endpoint |
| Auth Service | http://localhost:3001 | Authentication |
| User Service | http://localhost:3002 | User management |
| Pet Service | http://localhost:3003 | Pet listings |
| Matching Service | http://localhost:3004 | Swipe & match |
| Chat Service | http://localhost:3005 | Messaging |
| Marketplace | http://localhost:3006 | Services |
| Admin Service | http://localhost:3007 | Moderation |
| ML Recommender | http://localhost:8000 | AI recommendations |
| ML Fraud Detection | http://localhost:8001 | Fraud detection |
| PostgreSQL | localhost:5432 | Main database |
| MongoDB | localhost:27017 | Chat/logs database |
| Redis | localhost:6379 | Cache |
| RabbitMQ Management | http://localhost:15672 | Message queue UI |
| Elasticsearch | http://localhost:9200 | Search engine |
| MinIO Console | http://localhost:9001 | Object storage UI |

### Default Credentials

```
PostgreSQL:
  Username: petadmin
  Password: petpass123
  Database: pet_platform

MongoDB:
  Username: petadmin
  Password: petpass123
  Database: pet_platform_chat

Redis:
  Password: petredis123

RabbitMQ:
  Username: petadmin
  Password: petpass123

MinIO:
  Access Key: petadmin
  Secret Key: petpass123
```

---

## 🔧 Services

### 1. Auth Service (Port: 3001)

**Responsibilities:**
- User registration & login
- JWT token generation & validation
- OAuth integration (Google, Apple, LINE)
- Role-based access control (RBAC)
- Session management
- Password reset & email verification

**Key Endpoints:**
```
POST   /auth/register
POST   /auth/login
POST   /auth/oauth/google
POST   /auth/oauth/apple
POST   /auth/oauth/line
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/verify-email/:token
```

### 2. User & Profile Service (Port: 3002)

**Responsibilities:**
- User profile management
- Lifestyle preferences
- Trust score calculation
- Review management
- Identity verification

**Key Endpoints:**
```
GET    /users/:id
PATCH  /users/:id
GET    /users/:id/preferences
PUT    /users/:id/preferences
GET    /users/:id/reviews
POST   /users/:id/reviews
GET    /users/:id/trust-score
POST   /users/:id/verify-identity
```

### 3. Pet Service (Port: 3003)

**Responsibilities:**
- Pet profile CRUD
- Media upload & management
- Pet status management (adoption/breeding)
- Health records
- Search & filtering

**Key Endpoints:**
```
POST   /pets
GET    /pets/:id
PATCH  /pets/:id
DELETE /pets/:id
GET    /pets/search
POST   /pets/:id/photos
GET    /pets/:id/health-records
POST   /pets/:id/health-records
```

### 4. Matching Service (Port: 3004)

**Responsibilities:**
- Swipe logic (like/pass/super-like)
- Match creation & management
- Compatibility scoring
- ML recommendation integration
- Match lifecycle

**Key Endpoints:**
```
POST   /swipes
GET    /swipes/history
GET    /recommendations
POST   /matches/:id/accept
POST   /matches/:id/reject
GET    /matches
GET    /matches/:id
```

### 5. Chat Service (Port: 3005)

**Responsibilities:**
- Real-time messaging (WebSocket)
- Chat room management
- Message history
- Media sharing
- Read receipts
- Content moderation hooks

**Key Endpoints:**
```
WebSocket: ws://localhost:3005/chat
GET    /chat/rooms
GET    /chat/rooms/:id/messages
POST   /chat/rooms/:id/messages
PATCH  /chat/rooms/:id/messages/:messageId
DELETE /chat/rooms/:id/messages/:messageId
POST   /chat/rooms/:id/block
```

### 6. Marketplace Service (Port: 3006)

**Responsibilities:**
- Business profile management
- Service listings
- Reviews & ratings
- Bookings (optional)
- Promotions

**Key Endpoints:**
```
GET    /businesses
GET    /businesses/:id
POST   /businesses
GET    /businesses/:id/services
POST   /businesses/:id/services
GET    /services/search
POST   /bookings
GET    /bookings
```

### 7. Admin & Moderation Service (Port: 3007)

**Responsibilities:**
- Content moderation
- Stray animal approval
- Report management
- User suspension/blocking
- Analytics & statistics

**Key Endpoints:**
```
GET    /admin/reports
PATCH  /admin/reports/:id
GET    /admin/pending-approvals
POST   /admin/approve-pet/:id
POST   /admin/block-user/:id
GET    /admin/stats
GET    /admin/fraud-alerts
```

---

## 🗄️ Database Schema

### PostgreSQL Tables

#### Core Tables
- `users` - User accounts & profiles
- `user_preferences` - Lifestyle & adoption preferences
- `pets` - Pet profiles & listings
- `swipes` - User swipe history
- `matches` - Match records
- `reviews` - User reviews

#### Marketplace Tables
- `business_profiles` - Business accounts
- `services` - Service listings
- `service_reviews` - Service reviews
- `bookings` - Service bookings

#### Moderation Tables
- `reports` - Abuse reports
- `notifications` - User notifications
- `audit_logs` - System audit trail

### MongoDB Collections

- `chat_rooms` - Chat room metadata
- `messages` - Chat messages
- `activity_logs` - User activity tracking
- `user_sessions` - Active sessions
- `fraud_logs` - Fraud detection logs

---

## 📚 API Documentation

### Authentication

All protected endpoints require JWT token in Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Standard Response Format

```typescript
{
  "success": boolean,
  "data": any,
  "error": string,
  "message": string,
  "timestamp": Date
}
```

### Pagination

```http
GET /pets?page=1&limit=20&sort=created_at&order=desc
```

Response:
```typescript
{
  "items": Pet[],
  "total": number,
  "page": number,
  "limit": number,
  "total_pages": number,
  "has_next": boolean,
  "has_prev": boolean
}
```

### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

## 🤖 ML Services

### 1. Recommender Service (Port: 8000)

**Endpoints:**

```python
POST /api/v1/recommendations
{
  "user_id": "uuid",
  "user_preferences": {...},
  "location": {"lat": 13.7563, "lng": 100.5018},
  "limit": 20
}

Response:
{
  "recommendations": [
    {
      "pet": {...},
      "owner": {...},
      "compatibility_score": 0.92,
      "lifestyle_match_score": 0.88,
      "experience_match_score": 0.95,
      "location_score": 0.85,
      "reasons": ["Great for families", "Low maintenance"]
    }
  ],
  "model_version": "v1.2.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Features:**
- Content-based filtering
- Collaborative filtering
- Hybrid recommender
- Location-based scoring
- Lifestyle compatibility

### 2. Fraud Detection Service (Port: 8001)

**Endpoints:**

```python
POST /api/v1/detect
{
  "user_id": "uuid",
  "action": "create_listing",
  "entity_id": "pet-uuid",
  "context": {...}
}

Response:
{
  "is_suspicious": false,
  "risk_score": 0.12,
  "risk_factors": [
    {
      "factor": "new_account",
      "weight": 0.3,
      "description": "Account less than 7 days old"
    }
  ],
  "recommended_action": "flagged",
  "explanation": "Low risk, but monitor activity"
}
```

**Detection Features:**
- Fake profile detection
- Duplicate listing detection
- Behavioral anomaly detection
- Payment fraud detection
- Spam behavior detection

---

## 🔨 Development

### Local Development (Individual Service)

```bash
# Navigate to service directory
cd backend/services/auth-service

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Run in development mode
pnpm run start:dev
```

### Environment Variables

Each service has its own `.env` file. Example for Auth Service:

```bash
NODE_ENV=development
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=pet_platform
DATABASE_USER=petadmin
DATABASE_PASSWORD=petpass123
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=petredis123
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=24h
RABBITMQ_URL=amqp://petadmin:petpass123@localhost:5672
```

### Running Tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

### Database Migrations

```bash
# Create migration
pnpm run migration:create AddNewColumn

# Run migrations
pnpm run migration:run

# Revert migration
pnpm run migration:revert
```

### Code Quality

```bash
# Lint
pnpm run lint

# Format
pnpm run format

# Type check
pnpm run type-check
```

---

## 🚢 Deployment

### Development Environment

```bash
docker-compose up -d
```

### Production Deployment (Kubernetes)

```bash
# Build and push images
./scripts/build-images.sh
./scripts/push-images.sh

# Deploy to Kubernetes
kubectl apply -f infrastructure/k8s/namespace.yaml
kubectl apply -f infrastructure/k8s/configmaps/
kubectl apply -f infrastructure/k8s/secrets/
kubectl apply -f infrastructure/k8s/deployments/
kubectl apply -f infrastructure/k8s/services/
kubectl apply -f infrastructure/k8s/ingress/

# Check deployment status
kubectl get pods -n pet-platform
kubectl get services -n pet-platform
```

### Environment Configuration

**Development**: `docker-compose.yml`
**Staging**: `docker-compose.staging.yml`
**Production**: Kubernetes manifests in `infrastructure/k8s/`

---

## 🔐 Security

### Best Practices Implemented

1. **Authentication & Authorization**
   - JWT with short expiration times
   - Refresh token rotation
   - OAuth2 integration
   - Role-based access control (RBAC)

2. **Data Protection**
   - Data encryption at rest (database encryption)
   - Data encryption in transit (TLS/SSL)
   - PII data masking in logs
   - Secure password hashing (bcrypt)

3. **API Security**
   - Rate limiting (100 req/min per IP)
   - Request validation
   - CORS configuration
   - Helmet.js security headers
   - SQL injection prevention (parameterized queries)
   - XSS protection

4. **Compliance**
   - GDPR-ready data handling
   - PDPA Thailand compliance
   - Right to be forgotten
   - Data export capabilities
   - Audit logging

5. **Monitoring & Alerting**
   - Fraud detection system
   - Abuse reporting mechanism
   - Real-time anomaly detection
   - Security event logging

---

## 📊 MVP Roadmap

### Phase 1: MVP (3-4 months)

**Features:**
- ✅ User registration & authentication
- ✅ Pet listing creation & management
- ✅ Swipe-based matching
- ✅ Basic chat functionality
- ✅ Rule-based recommendations
- ✅ Admin approval system
- ✅ Basic marketplace listings
- ✅ Mobile responsive web app

**Deliverables:**
- Functional web application
- iOS & Android mobile apps
- Basic backend infrastructure
- Database setup
- Admin dashboard

### Phase 2: Enhanced Features (2-3 months)

**Features:**
- 🔄 ML-powered recommendations
- 🔄 Trust score system
- 🔄 Verified breeder badges
- 🔄 Advanced search & filters
- 🔄 Service booking system
- 🔄 Payment integration
- 🔄 Push notifications
- 🔄 Email notifications

### Phase 3: Scale & Advanced Features (3-4 months)

**Features:**
- 🔄 Genetic risk analysis for breeding
- 🔄 Pet health records integration
- 🔄 Insurance integration
- 🔄 B2B APIs for shelters
- 🔄 Advanced fraud detection
- 🔄 Multi-language support
- 🔄 Video calls for pet viewing
- 🔄 Community features (forums, groups)

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint + Prettier
- **Testing**: Minimum 80% coverage
- **Documentation**: JSDoc for public APIs
- **Commits**: Conventional Commits format

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

- **Backend Team**: NestJS microservices
- **Frontend Team**: Next.js & Flutter
- **ML Team**: Python FastAPI & ML models
- **DevOps Team**: Infrastructure & deployment
- **QA Team**: Testing & quality assurance

---

## 📞 Support

- **Documentation**: [docs.petplatform.com](https://docs.petplatform.com)
- **Email**: support@petplatform.com
- **Discord**: [Join our community](https://discord.gg/petplatform)
- **GitHub Issues**: [Report bugs](https://github.com/petplatform/issues)

---

## 🎯 Performance Targets

- **API Response Time**: < 200ms (p95)
- **Database Query Time**: < 50ms (p95)
- **Uptime**: 99.9%
- **Concurrent Users**: 10,000+
- **Message Latency**: < 100ms
- **Search Results**: < 500ms

---

## 🔄 Version History

- **v1.0.0** (Jan 2024) - Initial MVP release
- **v1.1.0** (Mar 2024) - ML recommendations
- **v1.2.0** (May 2024) - Trust score system
- **v2.0.0** (Aug 2024) - Breeding features

---

Built with ❤️ by the Pet Platform Team