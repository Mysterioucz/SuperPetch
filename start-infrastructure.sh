#!/bin/bash

# Pet Platform - Start Infrastructure Only
# This script starts only the database and infrastructure services

echo "🐾 Pet Platform - Starting Infrastructure Services"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

print_success "Docker is running"
echo ""

# Stop any existing containers
print_info "Stopping any existing containers..."
docker compose -f docker-compose.infrastructure.yml down 2>/dev/null

# Start infrastructure services
print_info "Starting infrastructure services..."
echo ""

docker compose -f docker-compose.infrastructure.yml up -d

echo ""
print_info "Waiting for services to be healthy (this may take 30-60 seconds)..."
echo ""

# Wait for services to be ready
sleep 5

# Check service status
services=(
    "postgres:5432:PostgreSQL"
    "mongodb:27017:MongoDB"
    "redis:6379:Redis"
    "rabbitmq:5672:RabbitMQ"
    "elasticsearch:9200:Elasticsearch"
    "minio:9000:MinIO"
)

all_healthy=true

for service in "${services[@]}"; do
    IFS=':' read -r container_name port service_label <<< "$service"

    if docker ps --format '{{.Names}}' | grep -q "pet-platform-${container_name}"; then
        print_success "${service_label} is running on port ${port}"
    else
        print_warning "${service_label} is not running"
        all_healthy=false
    fi
done

echo ""
echo "=================================================="
echo ""

if [ "$all_healthy" = true ]; then
    print_success "All infrastructure services are running!"
    echo ""
    print_info "Service URLs:"
    echo "  PostgreSQL:        localhost:5432"
    echo "  MongoDB:           localhost:27017"
    echo "  Redis:             localhost:6379"
    echo "  RabbitMQ:          localhost:5672"
    echo "  RabbitMQ UI:       http://localhost:15672"
    echo "  Elasticsearch:     http://localhost:9200"
    echo "  MinIO:             http://localhost:9000"
    echo "  MinIO Console:     http://localhost:9001"
    echo ""
    print_info "Default Credentials:"
    echo "  PostgreSQL:  petadmin / petpass123"
    echo "  MongoDB:     petadmin / petpass123"
    echo "  Redis:       petredis123"
    echo "  RabbitMQ:    petadmin / petpass123"
    echo "  MinIO:       petadmin / petpass123"
    echo ""
    print_info "Test Database Connection:"
    echo "  docker exec -it pet-platform-postgres psql -U petadmin -d pet_platform"
    echo ""
    print_info "View Logs:"
    echo "  docker compose -f docker-compose.infrastructure.yml logs -f"
    echo ""
    print_info "Stop Services:"
    echo "  docker compose -f docker-compose.infrastructure.yml down"
    echo ""
else
    print_warning "Some services failed to start. Check logs with:"
    echo "  docker compose -f docker-compose.infrastructure.yml logs"
fi

echo "=================================================="
