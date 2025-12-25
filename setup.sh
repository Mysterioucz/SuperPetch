#!/bin/bash

# Pet Platform - Setup Script
# This script sets up the entire development environment

set -e

echo "🐾 Pet Platform - Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

# Check Docker
if command_exists docker; then
    DOCKER_VERSION=$(docker --version | grep -oP '\d+\.\d+\.\d+' | head -1)
    print_success "Docker is installed (version: $DOCKER_VERSION)"
else
    print_error "Docker is not installed. Please install Docker Desktop first."
    echo "Visit: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check Docker Compose
if command_exists docker compose || docker compose version >/dev/null 2>&1; then
    print_success "Docker Compose is available"
else
    print_error "Docker Compose is not available"
    exit 1
fi

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version | grep -oP '\d+' | head -1)
    if [ "$NODE_VERSION" -ge 20 ]; then
        print_success "Node.js is installed (version: $(node --version))"
    else
        print_warning "Node.js version 20+ recommended. Current: $(node --version)"
    fi
else
    print_warning "Node.js is not installed. Recommended for local development."
    echo "Visit: https://nodejs.org/"
fi

# Check pnpm
if command_exists pnpm; then
    print_success "pnpm is installed (version: $(pnpm --version))"
else
    print_warning "pnpm is not installed. Recommended for local development."
    echo "Install: npm install -g pnpm"
fi

# Check Python
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version | grep -oP '\d+\.\d+' | head -1)
    print_success "Python is installed (version: $(python3 --version))"
else
    print_warning "Python is not installed. Required for ML services."
    echo "Visit: https://www.python.org/"
fi

echo ""
echo "================================"
echo ""

# Ask user what to set up
echo "What would you like to set up?"
echo "1) Full stack (All services with Docker)"
echo "2) Backend only (Microservices + Databases)"
echo "3) Frontend only (Next.js)"
echo "4) ML Services only"
echo "5) Development environment (Install dependencies)"
echo "6) Exit"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        print_info "Setting up full stack..."
        echo ""

        # Create necessary directories
        print_info "Creating directories..."
        mkdir -p backend/services/auth-service/src
        mkdir -p backend/services/user-service/src
        mkdir -p backend/services/pet-service/src
        mkdir -p backend/services/matching-service/src
        mkdir -p backend/services/chat-service/src
        mkdir -p backend/services/marketplace-service/src
        mkdir -p backend/services/admin-service/src
        mkdir -p backend/gateway/src
        mkdir -p backend/shared/src
        mkdir -p ml-services/recommender
        mkdir -p ml-services/fraud-detection
        print_success "Directories created"

        # Pull Docker images
        print_info "Pulling Docker images (this may take a while)..."
        docker compose pull
        print_success "Docker images pulled"

        # Start services
        print_info "Starting all services..."
        docker compose up -d

        echo ""
        print_info "Waiting for services to be healthy..."
        sleep 10

        # Check service health
        echo ""
        print_info "Checking service health..."

        services=("postgres:5432" "mongodb:27017" "redis:6379" "rabbitmq:5672" "elasticsearch:9200" "minio:9000")
        for service in "${services[@]}"; do
            IFS=':' read -r name port <<< "$service"
            if docker compose ps | grep -q "$name"; then
                print_success "$name is running"
            else
                print_warning "$name may not be ready yet"
            fi
        done

        echo ""
        print_success "Full stack setup complete!"
        echo ""
        print_info "Service URLs:"
        echo "  Frontend:          http://localhost:3100"
        echo "  API Gateway:       http://localhost:3000"
        echo "  RabbitMQ UI:       http://localhost:15672"
        echo "  MinIO Console:     http://localhost:9001"
        echo ""
        print_info "Database Credentials:"
        echo "  PostgreSQL: petadmin / petpass123"
        echo "  MongoDB:    petadmin / petpass123"
        echo "  Redis:      petredis123"
        echo "  RabbitMQ:   petadmin / petpass123"
        echo "  MinIO:      petadmin / petpass123"
        echo ""
        ;;

    2)
        echo ""
        print_info "Setting up backend services..."
        echo ""

        # Start only backend infrastructure
        docker compose up -d postgres mongodb redis rabbitmq elasticsearch minio

        print_info "Waiting for databases to be ready..."
        sleep 15

        # Start backend services
        docker compose up -d gateway auth-service user-service pet-service matching-service chat-service marketplace-service admin-service

        echo ""
        print_success "Backend services started!"
        echo ""
        print_info "API Gateway: http://localhost:3000"
        ;;

    3)
        echo ""
        print_info "Setting up frontend..."
        echo ""

        if ! command_exists pnpm; then
            print_error "pnpm is required. Install it with: npm install -g pnpm"
            exit 1
        fi

        # Install frontend dependencies
        print_info "Installing dependencies..."
        pnpm install

        print_success "Frontend setup complete!"
        echo ""
        print_info "To start the development server:"
        echo "  pnpm run dev"
        ;;

    4)
        echo ""
        print_info "Setting up ML services..."
        echo ""

        # Start ML services
        docker compose up -d postgres redis ml-recommender ml-fraud-detection

        print_success "ML services started!"
        echo ""
        print_info "Recommender API:      http://localhost:8000"
        print_info "Fraud Detection API:  http://localhost:8001"
        ;;

    5)
        echo ""
        print_info "Setting up development environment..."
        echo ""

        if ! command_exists pnpm; then
            print_warning "pnpm not found. Installing pnpm..."
            npm install -g pnpm
        fi

        # Install shared dependencies
        print_info "Installing shared package dependencies..."
        cd backend/shared && pnpm install && cd ../..
        print_success "Shared package dependencies installed"

        # Install frontend dependencies
        print_info "Installing frontend dependencies..."
        pnpm install
        print_success "Frontend dependencies installed"

        # Install Python dependencies for ML services
        if command_exists python3; then
            print_info "Installing Python dependencies for ML services..."

            # Create virtual environment
            if [ ! -d "ml-services/venv" ]; then
                python3 -m venv ml-services/venv
                print_success "Python virtual environment created"
            fi

            # Activate and install requirements
            source ml-services/venv/bin/activate
            pip install --upgrade pip

            # Install common ML libraries
            pip install fastapi uvicorn sqlalchemy psycopg2-binary redis scikit-learn pandas numpy

            deactivate
            print_success "Python dependencies installed"
        fi

        echo ""
        print_success "Development environment setup complete!"
        echo ""
        print_info "Next steps:"
        echo "1. Start databases: docker compose up -d postgres mongodb redis rabbitmq"
        echo "2. Start a service: cd backend/services/auth-service && pnpm run start:dev"
        echo "3. Start frontend: pnpm run dev"
        ;;

    6)
        echo "Exiting..."
        exit 0
        ;;

    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "================================"
echo ""
print_success "Setup completed successfully!"
echo ""
print_info "Useful commands:"
echo "  View logs:           docker compose logs -f [service-name]"
echo "  Stop all services:   docker compose down"
echo "  Restart a service:   docker compose restart [service-name]"
echo "  View running:        docker compose ps"
echo ""
print_info "Documentation: See PROJECT_README.md for detailed information"
echo ""
