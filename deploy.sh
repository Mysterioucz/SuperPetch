#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment process for Pet Platform...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found!${NC}"
    echo "Creating .env from .env.production..."
    cp .env.production .env
    echo -e "${YELLOW}IMPORTANT: Please edit .env file and set secure passwords and correct domain names before continuing.${NC}"
    echo "Once you have edited the .env file, run this script again."
    exit 1
fi

# Check if we are in production mode
if grep -q "NODE_ENV=production" .env; then
    echo -e "${GREEN}Production environment detected.${NC}"
else
    echo -e "${YELLOW}Warning: NODE_ENV is not set to production in .env${NC}"
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "Pulling latest images and building services..."
docker compose -f docker-compose.prod.yml up -d --build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Deployment successful!${NC}"
    echo "Services are running:"
    docker compose -f docker-compose.prod.yml ps
else
    echo -e "${RED}Deployment failed!${NC}"
    exit 1
fi
