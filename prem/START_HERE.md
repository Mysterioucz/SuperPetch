# 🚀 START HERE - Pet Platform Quick Setup

Welcome! This guide will get you running in **under 5 minutes**.

## ⚡ Quick Start (Infrastructure Only)

Since the full application services aren't built yet, let's start with the infrastructure:

### Step 1: Start Infrastructure Services (2 minutes)

```bash
# Navigate to project directory
cd prem

# Make the script executable
chmod +x start-infrastructure.sh

# Start all infrastructure services
./start-infrastructure.sh
```

This will start:
- ✅ PostgreSQL (Port 5432)
- ✅ MongoDB (Port 27017)
- ✅ Redis (Port 6379)
- ✅ RabbitMQ (Ports 5672, 15672)
- ✅ Elasticsearch (Port 9200)
- ✅ MinIO (Ports 9000, 9001)

### Step 2: Verify Services (30 seconds)

```bash
# Check all services are running
docker ps

# Test PostgreSQL connection
docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform -c "SELECT 'Connected!' as status;"

# Test MongoDB connection
docker exec -it pet-platform-mongodb mongosh -u petadmin -p petpass123 --authenticationDatabase admin --eval "db.adminCommand('ping')"

# Test Redis
docker exec -it pet-platform-redis redis-cli -a petredis123 ping
```

### Step 3: Access Admin Dashboards

- **RabbitMQ Dashboard**: http://localhost:15672
  - Username: `petadmin`
  - Password: `petpass123`

- **MinIO Console**: http://localhost:9001
  - Username: `petadmin`
  - Password: `petpass123`

- **Elasticsearch**: http://localhost:9200

---

## 🎯 What Works Right Now

### ✅ Infrastructure (100% Ready)
- All databases are running and initialized
- PostgreSQL has complete schema (15+ tables)
- MongoDB has 5 collections configured
- Redis is ready for caching
- RabbitMQ is ready for messaging
- MinIO is ready for file storage

### ✅ Frontend (Can Run)
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Access at http://localhost:3000
```

### ⏳ Backend Services (Need Implementation)
The backend microservices are scaffolded but need business logic implementation.

---

## 📋 Next Steps for Development

### Option 1: Frontend Development First

```bash
# Start infrastructure
./start-infrastructure.sh

# In a new terminal, start frontend
pnpm install
pnpm run dev

# Access at http://localhost:3000
# Start building pages!
```

### Option 2: Backend Development First

```bash
# Start infrastructure
./start-infrastructure.sh

# Generate service code (if not done)
./generate-services.sh

# Pick a service to work on (recommend Auth Service)
cd backend/services/auth-service

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Start in development mode
pnpm run start:dev

# The service will be available at http://localhost:3001
```

### Option 3: Full Stack Development

```bash
# Terminal 1: Infrastructure
./start-infrastructure.sh

# Terminal 2: Backend Service
cd backend/services/auth-service
pnpm install
pnpm run start:dev

# Terminal 3: Frontend
pnpm install
pnpm run dev
```

---

## 🗃️ Database Exploration

### PostgreSQL
```bash
# Connect to database
docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform

# Inside psql:
\dt                      # List all tables
\d users                 # Describe users table
SELECT * FROM users;     # View users
\q                       # Quit
```

### MongoDB
```bash
# Connect to MongoDB
docker exec -it pet-platform-mongodb mongosh -u petadmin -p petpass123 --authenticationDatabase admin

# Inside mongosh:
use pet_platform_chat
show collections
db.chat_rooms.find()
exit
```

---

## 🛠️ Common Commands

### Infrastructure Management
```bash
# Start services
./start-infrastructure.sh

# Stop services
docker-compose -f docker-compose.infrastructure.yml down

# View logs
docker-compose -f docker-compose.infrastructure.yml logs -f

# View specific service logs
docker-compose -f docker-compose.infrastructure.yml logs -f postgres

# Restart a service
docker-compose -f docker-compose.infrastructure.yml restart postgres

# Clean restart (removes data!)
docker-compose -f docker-compose.infrastructure.yml down -v
./start-infrastructure.sh
```

### Check Service Status
```bash
# View all running containers
docker ps

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}"

# View resource usage
docker stats
```

---

## 🎓 What to Build Next

### Recommended Order:

1. **Auth Service** (1-2 days)
   - Implement user registration
   - Implement login with JWT
   - Add password reset
   - Test with Postman/curl

2. **Frontend Auth Pages** (1-2 days)
   - Create login page
   - Create registration page
   - Integrate with Auth Service

3. **User Service** (1-2 days)
   - User profile CRUD
   - Preferences management
   - Integration with Auth

4. **Pet Service** (2-3 days)
   - Pet CRUD operations
   - Image upload to MinIO
   - Search functionality

5. **Frontend Pet Pages** (2-3 days)
   - Pet listing form
   - Pet browsing interface
   - Pet detail view

6. **Matching Service** (2-3 days)
   - Swipe logic
   - Match creation
   - Basic recommendations

7. **Chat Service** (3-4 days)
   - WebSocket setup
   - Real-time messaging
   - Chat UI

---

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[PROJECT_README.md](PROJECT_README.md)** - Complete documentation
- **[QUICK_START.md](QUICK_START.md)** - Detailed setup guide
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Comprehensive walkthrough
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What's done and what's next

---

## 🐛 Troubleshooting

### Ports Already in Use
```bash
# Find what's using a port
lsof -i :5432
lsof -i :27017

# Kill the process or change ports in docker-compose.infrastructure.yml
```

### Docker Issues
```bash
# Restart Docker Desktop
# Then try again

# Or clean up Docker
docker system prune -a
```

### Services Not Starting
```bash
# Check logs
docker-compose -f docker-compose.infrastructure.yml logs postgres

# Check disk space
df -h

# Increase Docker memory (Docker Desktop → Settings → Resources → Memory → 4GB+)
```

---

## ✅ Verification Checklist

Before starting development, verify:

- [ ] Docker Desktop is running
- [ ] All 6 infrastructure services are running (`docker ps`)
- [ ] Can connect to PostgreSQL
- [ ] Can connect to MongoDB
- [ ] Can access RabbitMQ dashboard (http://localhost:15672)
- [ ] Can access MinIO console (http://localhost:9001)
- [ ] Frontend can start (`pnpm run dev`)

---

## 🎉 You're Ready!

Your infrastructure is running. Now choose your path:

1. **Just Learning?** → Explore the databases and documentation
2. **Backend Developer?** → Start with Auth Service implementation
3. **Frontend Developer?** → Start building pages with Next.js
4. **Full Stack?** → Start with Auth Service + Login Page

---

## 🆘 Need Help?

- **Logs**: `docker-compose -f docker-compose.infrastructure.yml logs -f [service]`
- **Database**: Check `infrastructure/database/` for schemas
- **Documentation**: Read `PROJECT_README.md` for details
- **Status**: Run `docker ps` to see what's running

---

## 💡 Pro Tips

1. **Always start with infrastructure** - Run `./start-infrastructure.sh` first
2. **Keep infrastructure running** - Don't stop these services while developing
3. **Use separate terminals** - One for infrastructure logs, one for backend, one for frontend
4. **Check logs often** - `docker-compose logs -f` is your friend
5. **Test APIs with Postman** - Create a collection for your endpoints
6. **Commit frequently** - Git is your safety net
7. **Read the docs** - We've written comprehensive documentation for you

---

## 🚀 Let's Build!

```bash
# Start infrastructure
./start-infrastructure.sh

# Wait 30 seconds for all services to be healthy

# Start coding! 🎉
```

**Everything is ready. Time to build something amazing!** 🐾