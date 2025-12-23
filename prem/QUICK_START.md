# 🚀 Quick Start Guide - Pet Platform

Welcome to the Pet Platform! This guide will get you up and running in less than 10 minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** 24+ ([Download](https://www.docker.com/products/docker-desktop))
- **Node.js** 20+ (Optional, for local development) ([Download](https://nodejs.org/))
- **pnpm** 8+ (Optional) - Install: `npm install -g pnpm`

## 🎯 Option 1: Quick Start with Docker (Recommended)

This is the fastest way to get everything running.

### Step 1: Make Scripts Executable

```bash
chmod +x setup.sh generate-services.sh
```

### Step 2: Generate Service Code

```bash
./generate-services.sh
```

This will generate all microservice boilerplate code.

### Step 3: Run Setup Script

```bash
./setup.sh
```

Choose option **1** (Full stack) when prompted.

### Step 4: Wait for Services to Start

The setup script will:
- Pull all Docker images
- Start databases (PostgreSQL, MongoDB, Redis, etc.)
- Start all microservices
- Start the frontend

This takes about 3-5 minutes depending on your internet speed.

### Step 5: Verify Everything is Running

```bash
docker-compose ps
```

You should see all services in "Up" state.

### Step 6: Access the Application

- **Frontend**: http://localhost:3100
- **API Gateway**: http://localhost:3000
- **API Documentation**: http://localhost:3001/api/docs (Auth Service example)
- **RabbitMQ Dashboard**: http://localhost:15672 (petadmin/petpass123)
- **MinIO Console**: http://localhost:9001 (petadmin/petpass123)

## 🔧 Option 2: Manual Setup (For Development)

If you want to run services individually:

### Step 1: Start Infrastructure

```bash
docker-compose up -d postgres mongodb redis rabbitmq elasticsearch minio
```

### Step 2: Install Dependencies

```bash
# Install shared package
cd backend/shared
pnpm install
cd ../..

# Install frontend
pnpm install

# Install a service (example: auth-service)
cd backend/services/auth-service
pnpm install
```

### Step 3: Configure Environment

```bash
# Copy environment file
cd backend/services/auth-service
cp .env.example .env
```

Edit `.env` with your configuration (defaults should work).

### Step 4: Run a Service

```bash
# From the service directory
pnpm run start:dev
```

### Step 5: Run Frontend

```bash
# From project root
pnpm run dev
```

## 📚 What's Included

After setup, you'll have the following services running:

### Backend Services (Microservices)

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | Main API entry point |
| Auth Service | 3001 | Authentication & Authorization |
| User Service | 3002 | User profiles & preferences |
| Pet Service | 3003 | Pet listings & management |
| Matching Service | 3004 | Swipe & matching logic |
| Chat Service | 3005 | Real-time messaging |
| Marketplace Service | 3006 | Business & services |
| Admin Service | 3007 | Moderation & admin tools |

### ML Services (Python/FastAPI)

| Service | Port | Description |
|---------|------|-------------|
| Recommender | 8000 | AI-powered recommendations |
| Fraud Detection | 8001 | Fraud detection system |

### Infrastructure

| Service | Port | Credentials |
|---------|------|-------------|
| PostgreSQL | 5432 | petadmin / petpass123 |
| MongoDB | 27017 | petadmin / petpass123 |
| Redis | 6379 | petredis123 |
| RabbitMQ | 5672, 15672 | petadmin / petpass123 |
| Elasticsearch | 9200 | - |
| MinIO | 9000, 9001 | petadmin / petpass123 |

## 🧪 Testing the Setup

### 1. Check Health Endpoints

```bash
# API Gateway
curl http://localhost:3000/api/v1/health

# Auth Service
curl http://localhost:3001/api/v1/health

# ML Recommender
curl http://localhost:8000/health
```

All should return `{"status":"ok"}` or similar.

### 2. Check Database Connections

```bash
# PostgreSQL
docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform -c "SELECT COUNT(*) FROM users;"

# MongoDB
docker exec -it pet-platform-mongodb mongosh -u petadmin -p petpass123 --authenticationDatabase admin
```

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f auth-service

# Last 100 lines
docker-compose logs --tail=100 auth-service
```

## 📖 Next Steps

### 1. Create Your First User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

Save the `access_token` from the response.

### 3. Explore API Documentation

Visit the Swagger documentation for any service:

- Auth: http://localhost:3001/api/docs
- User: http://localhost:3002/api/docs
- Pet: http://localhost:3003/api/docs

### 4. Access Admin Panel

Default admin credentials are pre-seeded in the database:

- Email: `admin@petplatform.com`
- Password: Set during first login

## 🛠️ Common Tasks

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Start)

```bash
docker-compose down -v
```

### Restart a Single Service

```bash
docker-compose restart auth-service
```

### View Service Logs

```bash
docker-compose logs -f auth-service
```

### Execute Commands in Container

```bash
docker-compose exec auth-service sh
```

### Database Backup

```bash
# PostgreSQL
docker exec pet-platform-postgres pg_dump -U petadmin pet_platform > backup.sql

# MongoDB
docker exec pet-platform-mongodb mongodump --username petadmin --password petpass123 --out /backup
```

### Rebuild a Service

```bash
docker-compose up -d --build auth-service
```

## 🐛 Troubleshooting

### Services Won't Start

1. Check if ports are already in use:
```bash
lsof -i :3000
lsof -i :5432
```

2. Stop conflicting services or change ports in `docker-compose.yml`

### Database Connection Issues

1. Wait a bit longer - databases take 30-60 seconds to initialize
2. Check database health:
```bash
docker-compose ps postgres
docker-compose logs postgres
```

### Out of Memory

Docker Desktop default memory limit might be too low. Increase it:
- Docker Desktop → Settings → Resources → Memory → Set to 4GB+

### Permission Denied

```bash
chmod +x setup.sh generate-services.sh
```

### Port Already in Use

Edit `docker-compose.yml` and change the port mapping:
```yaml
ports:
  - "3001:3001"  # Change first port: "3101:3001"
```

### Services Not Connecting

Check if all services are on the same network:
```bash
docker network ls
docker network inspect pet-platform_pet-network
```

## 📊 Monitoring

### View Resource Usage

```bash
docker stats
```

### Check Service Health

```bash
docker-compose ps
```

### View All Logs

```bash
docker-compose logs -f
```

## 🔐 Security Notes

⚠️ **IMPORTANT**: The default credentials are for **development only**.

For production:

1. Change all default passwords
2. Use environment-specific secrets
3. Enable SSL/TLS
4. Set up proper firewall rules
5. Use secure JWT secrets
6. Enable rate limiting
7. Set up monitoring and alerting

## 📱 Mobile App Development

### Flutter Setup (iOS/Android)

The mobile apps are separate Flutter projects. To set up:

```bash
# Coming soon - Flutter apps will be in /mobile directory
# flutter pub get
# flutter run
```

For now, use the responsive web app which works on mobile browsers.

## 🎨 Frontend Development

### Run Frontend Only

```bash
pnpm run dev
```

Access at: http://localhost:3000

### Build for Production

```bash
pnpm run build
pnpm run start
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
```

## 🤖 ML Services Development

### Run ML Services Locally

```bash
# Create virtual environment
python3 -m venv ml-services/venv
source ml-services/venv/bin/activate

# Install dependencies
cd ml-services/recommender
pip install -r requirements.txt

# Run service
uvicorn main:app --reload --port 8000
```

### Test ML Endpoints

```bash
curl -X POST http://localhost:8000/api/v1/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "123",
    "user_preferences": {
      "experience_level": "intermediate",
      "preferred_pet_types": ["dog", "cat"]
    },
    "limit": 10
  }'
```

## 📚 Additional Resources

- **Full Documentation**: See `PROJECT_README.md`
- **Architecture**: See architecture diagrams in `PROJECT_README.md`
- **Database Schema**: See `infrastructure/database/postgres/init.sql`
- **API Endpoints**: Visit `/api/docs` on any service
- **Support**: Create an issue on GitHub

## ✅ Verification Checklist

Before proceeding with development, verify:

- [ ] All Docker containers are running (`docker-compose ps`)
- [ ] Can access frontend at http://localhost:3100
- [ ] Can access API Gateway at http://localhost:3000
- [ ] PostgreSQL is accessible and initialized
- [ ] MongoDB is accessible
- [ ] Redis is accessible
- [ ] Can create a user via API
- [ ] Can login via API
- [ ] Health endpoints return OK

## 🎉 You're Ready!

Congratulations! Your Pet Platform is now running. Here's what you can do next:

1. **Explore the Frontend**: Visit http://localhost:3100
2. **Read the API Docs**: Visit http://localhost:3001/api/docs
3. **Check the Database**: Connect to PostgreSQL and explore tables
4. **Create Test Data**: Use the API to create users, pets, matches
5. **Develop Features**: Start building on top of the platform
6. **Customize**: Modify services to fit your needs

## 🆘 Need Help?

- Check `PROJECT_README.md` for detailed documentation
- Review logs: `docker-compose logs -f [service-name]`
- Check service health: `curl http://localhost:[port]/api/v1/health`
- Restart services: `docker-compose restart [service-name]`
- Clean restart: `docker-compose down -v && docker-compose up -d`

## 🚀 Happy Coding!

You now have a fully functional microservices platform with:
- 7 backend microservices
- 2 ML services
- 6 infrastructure components
- 1 modern frontend
- Complete CI/CD setup

Start building amazing features for pet adoption and breeding! 🐾