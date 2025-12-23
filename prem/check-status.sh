#!/bin/bash

# Pet Platform - System Status Check
# This script checks the status of all services and components

echo "🐾 Pet Platform - System Status Check"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
check_service() {
    local name=$1
    local url=$2

    if curl -s -f -o /dev/null "$url"; then
        echo -e "${GREEN}✓${NC} $name is ${GREEN}healthy${NC} - $url"
        return 0
    else
        echo -e "${RED}✗${NC} $name is ${RED}not responding${NC} - $url"
        return 1
    fi
}

check_docker_service() {
    local container_name=$1

    if docker ps --format '{{.Names}}' | grep -q "^${container_name}$"; then
        local status=$(docker inspect -f '{{.State.Health.Status}}' "$container_name" 2>/dev/null || echo "running")
        if [ "$status" = "healthy" ] || [ "$status" = "running" ]; then
            echo -e "${GREEN}✓${NC} $container_name is ${GREEN}running${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠${NC} $container_name is ${YELLOW}$status${NC}"
            return 1
        fi
    else
        echo -e "${RED}✗${NC} $container_name is ${RED}not running${NC}"
        return 1
    fi
}

# Check if Docker is running
echo "📦 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}✗ Docker is not running${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi
echo -e "${GREEN}✓ Docker is running${NC}"
echo ""

# Check infrastructure services
echo "🗄️  Infrastructure Services:"
check_docker_service "pet-platform-postgres"
check_docker_service "pet-platform-mongodb"
check_docker_service "pet-platform-redis"
check_docker_service "pet-platform-rabbitmq"
check_docker_service "pet-platform-elasticsearch"
check_docker_service "pet-platform-minio"
echo ""

# Check backend services
echo "🔧 Backend Microservices:"
check_docker_service "pet-platform-gateway"
check_docker_service "pet-auth-service"
check_docker_service "pet-user-service"
check_docker_service "pet-pet-service"
check_docker_service "pet-matching-service"
check_docker_service "pet-chat-service"
check_docker_service "pet-marketplace-service"
check_docker_service "pet-admin-service"
echo ""

# Check ML services
echo "🤖 ML Services:"
check_docker_service "pet-ml-recommender"
check_docker_service "pet-ml-fraud-detection"
echo ""

# Check frontend
echo "🎨 Frontend:"
check_docker_service "pet-platform-frontend"
echo ""

# Check HTTP endpoints
echo "🌐 HTTP Health Checks:"
check_service "API Gateway     " "http://localhost:3000/api/v1/health"
check_service "Auth Service    " "http://localhost:3001/api/v1/health"
check_service "User Service    " "http://localhost:3002/api/v1/health"
check_service "Pet Service     " "http://localhost:3003/api/v1/health"
check_service "Matching Service" "http://localhost:3004/api/v1/health"
check_service "Chat Service    " "http://localhost:3005/api/v1/health"
check_service "Marketplace     " "http://localhost:3006/api/v1/health"
check_service "Admin Service   " "http://localhost:3007/api/v1/health"
check_service "ML Recommender  " "http://localhost:8000/health"
check_service "ML Fraud Detect " "http://localhost:8001/health"
check_service "Frontend        " "http://localhost:3100/api/health"
echo ""

# Check database connections
echo "💾 Database Connectivity:"
if docker exec pet-platform-postgres pg_isready -U petadmin > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} PostgreSQL is accepting connections"
else
    echo -e "${RED}✗${NC} PostgreSQL is not accepting connections"
fi

if docker exec pet-platform-mongodb mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MongoDB is accepting connections"
else
    echo -e "${RED}✗${NC} MongoDB is not accepting connections"
fi

if docker exec pet-platform-redis redis-cli -a petredis123 ping 2>/dev/null | grep -q PONG; then
    echo -e "${GREEN}✓${NC} Redis is accepting connections"
else
    echo -e "${RED}✗${NC} Redis is not accepting connections"
fi
echo ""

# Display resource usage
echo "📊 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | head -n 10
echo ""

# Check disk space
echo "💿 Disk Space:"
df -h | grep -E 'Filesystem|/dev/' | head -n 5
echo ""

# Summary
echo "======================================"
echo "📝 Summary:"
echo ""
echo "Service URLs:"
echo "  Frontend:          http://localhost:3100"
echo "  API Gateway:       http://localhost:3000"
echo "  API Docs (Auth):   http://localhost:3001/api/docs"
echo "  RabbitMQ UI:       http://localhost:15672"
echo "  MinIO Console:     http://localhost:9001"
echo ""
echo "Default Credentials:"
echo "  PostgreSQL: petadmin / petpass123"
echo "  MongoDB:    petadmin / petpass123"
echo "  Redis:      petredis123"
echo "  RabbitMQ:   petadmin / petpass123"
echo "  MinIO:      petadmin / petpass123"
echo ""
echo "Useful Commands:"
echo "  View logs:         docker-compose logs -f [service-name]"
echo "  Restart service:   docker-compose restart [service-name]"
echo "  Stop all:          docker-compose down"
echo "  Start all:         docker-compose up -d"
echo ""
echo "======================================"
