# 🔧 Troubleshooting Guide - Pet Platform

## Common Issues and Solutions

### ⚠️ Port Already in Use Errors

If you see errors like:
```
failed to bind host port 0.0.0.0:27017/tcp: address already in use
failed to bind host port 0.0.0.0:5432/tcp: address already in use
```

This means another service is already using that port on your system.

#### Solution 1: Stop the Conflicting Service

**For MongoDB (Port 27017):**
```bash
# Check what's using the port
sudo lsof -i :27017

# Stop MongoDB if it's running locally
sudo systemctl stop mongod
# or
brew services stop mongodb-community
# or
sudo service mongodb stop
```

**For PostgreSQL (Port 5432):**
```bash
# Check what's using the port
sudo lsof -i :5432

# Stop PostgreSQL if it's running locally
sudo systemctl stop postgresql
# or
brew services stop postgresql
# or
sudo service postgresql stop
```

**For Redis (Port 6379):**
```bash
# Check what's using the port
sudo lsof -i :6379

# Stop Redis if it's running locally
sudo systemctl stop redis
# or
brew services stop redis
# or
sudo service redis-server stop
```

#### Solution 2: Change Docker Container Ports

Edit `docker-compose.infrastructure.yml` and change the **first** port number (host port):

```yaml
# Original:
ports:
  - "27017:27017"

# Change to (use different host port):
ports:
  - "27018:27017"  # Access MongoDB on localhost:27018
```

**Common Port Mappings:**
```yaml
# PostgreSQL
ports:
  - "5433:5432"  # Change from 5432 to 5433

# MongoDB
ports:
  - "27018:27017"  # Change from 27017 to 27018

# Redis
ports:
  - "6380:6379"  # Change from 6379 to 6380
```

After changing ports, update your service `.env` files accordingly.

#### Solution 3: Quick Port Check Script

```bash
# Check all required ports
for port in 3000 5432 27017 6379 5672 9200 9000; do
  echo -n "Port $port: "
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ IN USE"
    lsof -Pi :$port -sTCP:LISTEN | grep LISTEN
  else
    echo "✅ Available"
  fi
done
```

---

## Docker Issues

### Docker Not Running
```bash
# Error: Cannot connect to the Docker daemon
# Solution: Start Docker Desktop and wait for it to fully initialize
```

### Out of Disk Space
```bash
# Check Docker disk usage
docker system df

# Clean up unused resources
docker system prune -a

# Remove stopped containers
docker container prune

# Remove unused volumes (WARNING: This deletes data!)
docker volume prune
```

### Out of Memory
```bash
# Increase Docker memory allocation:
# Docker Desktop → Settings → Resources → Memory
# Set to at least 4GB (8GB recommended)
```

### Network Issues
```bash
# If containers can't communicate:
docker network ls
docker network inspect prem_pet-network

# Recreate network
docker compose -f docker-compose.infrastructure.yml down
docker network prune
docker compose -f docker-compose.infrastructure.yml up -d
```

---

## Database Issues

### PostgreSQL Won't Start
```bash
# Check logs
docker compose -f docker-compose.infrastructure.yml logs postgres

# Common issues:
# 1. Port already in use (see above)
# 2. Permission issues on data volume
# 3. Corrupted data directory

# Solution: Fresh start
docker compose -f docker-compose.infrastructure.yml down -v
docker volume rm prem_postgres_data
docker compose -f docker-compose.infrastructure.yml up -d postgres
```

### PostgreSQL Connection Refused
```bash
# Wait for PostgreSQL to fully initialize (can take 30-60 seconds)
# Check if it's ready:
docker exec pet-platform-postgres pg_isready -U petadmin

# If still failing, check logs:
docker logs pet-platform-postgres
```

### MongoDB Authentication Failed
```bash
# If you see authentication errors:
# The database might have old credentials

# Solution: Remove volume and recreate
docker compose -f docker-compose.infrastructure.yml down
docker volume rm prem_mongo_data
docker compose -f docker-compose.infrastructure.yml up -d mongodb
```

### Redis Connection Timeout
```bash
# Check Redis is running
docker exec pet-platform-redis redis-cli -a petredis123 ping

# Should return: PONG

# If not working:
docker compose -f docker-compose.infrastructure.yml restart redis
docker logs pet-platform-redis
```

---

## Service Won't Start

### Missing Dependencies
```bash
# Error: Cannot find module 'xyz'
# Solution: Install dependencies
pnpm install

# If still failing:
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Compilation Errors
```bash
# Clear build cache
rm -rf dist

# Rebuild
pnpm run build

# For NestJS services:
nest build
```

### Environment Variables Not Set
```bash
# Make sure .env file exists
cp .env.example .env

# Check environment variables are loaded
cat .env

# For Node.js services, install dotenv:
pnpm add dotenv
```

---

## Frontend Issues

### Port 3000 Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or run Next.js on different port
PORT=3001 pnpm run dev
```

### Module Not Found
```bash
# Install dependencies
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm run dev
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

---

## Performance Issues

### Slow Docker Performance
```bash
# Increase resources:
# Docker Desktop → Settings → Resources
# - CPU: At least 4 cores
# - Memory: At least 4GB (8GB recommended)
# - Disk: At least 20GB

# Clean up unused resources
docker system prune -a
```

### Database Slow Queries
```bash
# PostgreSQL: Check slow queries
docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform
# Inside psql:
SELECT * FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;

# Add indexes if needed (check init.sql for existing indexes)
```

### High Memory Usage
```bash
# Check container memory usage
docker stats

# If a service is using too much memory:
docker compose -f docker-compose.infrastructure.yml restart <service>
```

---

## Permission Issues

### Permission Denied on Scripts
```bash
# Make scripts executable
chmod +x setup.sh
chmod +x generate-services.sh
chmod +x start-infrastructure.sh
chmod +x check-status.sh
```

### Docker Volume Permission Issues
```bash
# If you see permission denied on volumes:
# This usually happens on Linux

# Solution: Run with sudo (not recommended) or:
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and back in, then:
docker compose -f docker-compose.infrastructure.yml down
docker volume rm prem_postgres_data prem_mongo_data
docker compose -f docker-compose.infrastructure.yml up -d
```

---

## Complete Reset

If everything is broken and you want to start fresh:

```bash
# WARNING: This deletes ALL data!

# Stop all containers
docker compose -f docker-compose.infrastructure.yml down

# Remove all volumes (deletes data!)
docker volume rm prem_postgres_data prem_mongo_data prem_redis_data prem_rabbitmq_data prem_elasticsearch_data prem_minio_data

# Remove network
docker network rm prem_pet-network

# Clean up Docker
docker system prune -a

# Start fresh
./start-infrastructure.sh
```

---

## Health Check Commands

### Quick Status Check
```bash
# Check all containers
docker ps

# Check specific service
docker ps | grep postgres

# Check logs
docker logs pet-platform-postgres
docker logs pet-platform-mongodb
```

### Database Connectivity Tests
```bash
# PostgreSQL
docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform -c "SELECT version();"

# MongoDB
docker exec -it pet-platform-mongodb mongosh -u petadmin -p petpass123 --authenticationDatabase admin --eval "db.version()"

# Redis
docker exec -it pet-platform-redis redis-cli -a petredis123 ping

# RabbitMQ
curl http://localhost:15672/api/overview -u petadmin:petpass123

# Elasticsearch
curl http://localhost:9200/_cluster/health

# MinIO
curl http://localhost:9000/minio/health/live
```

### Service Health Endpoints
```bash
# API Gateway
curl http://localhost:3000/api/v1/health

# Auth Service
curl http://localhost:3001/api/v1/health

# Frontend
curl http://localhost:3100/api/health
```

---

## Getting Help

### Check Logs First
```bash
# Infrastructure logs
docker compose -f docker-compose.infrastructure.yml logs -f

# Specific service
docker compose -f docker-compose.infrastructure.yml logs -f postgres

# Last 100 lines
docker compose -f docker-compose.infrastructure.yml logs --tail=100 postgres
```

### Verify Configuration
```bash
# Check Docker Compose config
docker compose -f docker-compose.infrastructure.yml config

# Check environment variables
docker compose -f docker-compose.infrastructure.yml config | grep environment -A 10
```

### System Information
```bash
# Docker version
docker --version
docker compose version

# System resources
docker system df
docker system info

# Running containers
docker ps -a
```

---

## Common Error Messages

### "driver failed programming external connectivity"
**Cause**: Port already in use
**Solution**: See "Port Already in Use Errors" section above

### "Cannot connect to the Docker daemon"
**Cause**: Docker Desktop not running
**Solution**: Start Docker Desktop

### "no space left on device"
**Cause**: Docker disk full
**Solution**: Run `docker system prune -a`

### "network prem_pet-network not found"
**Cause**: Network was deleted or not created
**Solution**: Run `docker compose -f docker-compose.infrastructure.yml up -d`

### "permission denied while trying to connect to the Docker daemon"
**Cause**: User not in docker group
**Solution**: Run `sudo usermod -aG docker $USER` and log out/in

### "connection refused"
**Cause**: Service not ready yet
**Solution**: Wait 30-60 seconds for services to initialize

---

## Prevention Tips

1. **Always check port availability** before starting services
2. **Commit your changes frequently** to avoid losing work
3. **Keep Docker Desktop updated** to latest version
4. **Monitor disk space** regularly
5. **Stop local database services** before starting Docker containers
6. **Read logs** when something goes wrong
7. **Use docker compose logs** to debug issues
8. **Keep volumes backed up** if you have important data

---

## Still Having Issues?

1. Check all documentation in the project
2. Review logs carefully: `docker compose logs -f`
3. Try a complete reset (see "Complete Reset" section)
4. Check Docker Desktop settings (Resources)
5. Verify your system meets minimum requirements:
   - Docker Desktop 24+
   - 10GB free disk space
   - 4GB+ RAM allocated to Docker
   - All required ports available

---

**Remember**: Most issues are related to port conflicts or Docker resource allocation. Start there first! 🚀