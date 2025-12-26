#!/bin/bash

# ============================================
# Force Rebuild Pet Service on EC2
# ============================================
# This script completely removes and rebuilds the pet-service
# to ensure no cached layers are used

set -e

echo "🔨 Force Rebuilding Pet Service..."
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    exit 1
fi

echo "Step 1: Stopping pet-service..."
docker compose -f docker-compose.prod.yml --env-file .env.production stop pet-service

echo ""
echo "Step 2: Removing pet-service container..."
docker compose -f docker-compose.prod.yml --env-file .env.production rm -f pet-service

echo ""
echo "Step 3: Removing pet-service image..."
docker rmi pawhome-pet-service 2>/dev/null || echo "Image already removed or doesn't exist"

echo ""
echo "Step 4: Pruning build cache..."
docker builder prune -f

echo ""
echo "Step 5: Rebuilding pet-service (no cache)..."
docker compose -f docker-compose.prod.yml --env-file .env.production build --no-cache --pull pet-service

echo ""
echo "Step 6: Starting pet-service..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d pet-service

echo ""
echo "Step 7: Waiting for service to be healthy (30s)..."
sleep 30

echo ""
echo "Step 8: Checking service health..."
HEALTH=$(docker inspect --format='{{.State.Health.Status}}' pet-pet-service 2>/dev/null || echo "unknown")
echo "Health status: $HEALTH"

echo ""
echo "Step 9: Checking logs..."
docker logs pet-pet-service --tail 20

echo ""
echo "Step 10: Verifying compiled DTO..."
echo "Checking if species field exists in compiled code:"
if docker exec pet-pet-service test -f /app/backend/services/pet-service/dist/dto/create-pet.dto.js; then
    docker exec pet-pet-service grep -c "species" /app/backend/services/pet-service/dist/dto/create-pet.dto.js || echo "species not found in DTO!"
else
    echo "⚠️  Warning: Compiled DTO file not found!"
fi

echo ""
echo "✅ Rebuild complete!"
echo ""
echo "Test the API:"
echo 'curl -X POST http://localhost:3000/api/v1/pets \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{'
echo '    "name": "Buddy",'
echo '    "species": "Dog",'
echo '    "breed": "Golden Retriever",'
echo '    "gender": "male",'
echo '    "size": "large",'
echo '    "description": "Friendly dog",'
echo '    "city": "Bangkok"'
echo '  }'"'"
echo ""
