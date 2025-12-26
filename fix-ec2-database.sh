#!/bin/bash

# ============================================
# EC2 Database Fix Script
# ============================================
# This script fixes the database initialization on EC2
# Run this on your EC2 instance after pulling the latest changes

set -e

echo "🔧 Fixing EC2 Database Setup..."
echo ""

# Check if running on EC2
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production not found!"
    echo "Make sure you're running this in the project directory"
    exit 1
fi

# Load environment
source .env.production

echo "📊 Current database name: ${DATABASE_NAME}"
echo ""

# Stop services that depend on database
echo "🛑 Stopping backend services..."
docker compose -f docker-compose.prod.yml --env-file .env.production stop \
    auth-service \
    user-service \
    pet-service \
    matching-service \
    marketplace-service \
    admin-service \
    ml-recommender \
    ml-fraud-detection

echo ""
echo "🗄️  Checking database..."

# Check if database exists
DB_EXISTS=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -lqt | cut -d \| -f 1 | grep -w ${DATABASE_NAME} | wc -l)

if [ "$DB_EXISTS" -eq 0 ]; then
    echo "Creating database ${DATABASE_NAME}..."
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d postgres -c "CREATE DATABASE ${DATABASE_NAME};"
else
    echo "✓ Database ${DATABASE_NAME} exists"
fi

echo ""
echo "🔑 Updating database password..."
docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d postgres -c "ALTER USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';" 2>/dev/null || true

echo ""
echo "📝 Running initialization script..."
docker exec -i pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} < infrastructure/database/postgres/init.sql 2>&1 | grep -E "^(CREATE TABLE|CREATE INDEX|ERROR)" || true

echo ""
echo "✅ Verifying tables..."
TABLES=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "\dt" | grep "public" | wc -l)

if [ "$TABLES" -gt 5 ]; then
    echo "✓ Found $TABLES tables in database"
else
    echo "⚠️  Warning: Only found $TABLES tables. Expected more."
    echo "Showing tables:"
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "\dt"
fi

echo ""
echo "🚀 Starting backend services..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d \
    auth-service \
    user-service \
    pet-service \
    matching-service \
    marketplace-service \
    admin-service \
    ml-recommender \
    ml-fraud-detection

echo ""
echo "⏳ Waiting for services to start (20s)..."
sleep 20

echo ""
echo "🧪 Testing auth service..."
AUTH_STATUS=$(docker exec pet-auth-service wget -q -O- http://localhost:3001/api/v1/health 2>/dev/null || echo "failed")

if [[ "$AUTH_STATUS" == *"ok"* ]] || [[ "$AUTH_STATUS" == *"healthy"* ]]; then
    echo "✓ Auth service is healthy"
else
    echo "⚠️  Auth service might still be starting..."
    echo "Check logs: docker logs pet-auth-service --tail 50"
fi

echo ""
echo "🎯 Testing login endpoint..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' 2>/dev/null || echo "failed")

if [[ "$LOGIN_RESPONSE" == *"401"* ]] || [[ "$LOGIN_RESPONSE" == *"Unauthorized"* ]] || [[ "$LOGIN_RESPONSE" == *"Invalid"* ]]; then
    echo "✅ Gateway is working! (401 Unauthorized is expected for invalid credentials)"
elif [[ "$LOGIN_RESPONSE" == *"502"* ]] || [[ "$LOGIN_RESPONSE" == *"Bad Gateway"* ]]; then
    echo "❌ Still getting 502 error"
    echo "Response: $LOGIN_RESPONSE"
    echo ""
    echo "Check auth-service logs:"
    echo "  docker logs pet-auth-service --tail 30"
elif [[ "$LOGIN_RESPONSE" == "failed" ]]; then
    echo "⚠️  Could not connect to gateway"
else
    echo "Response: $LOGIN_RESPONSE"
fi

echo ""
echo "📋 Service Status:"
docker compose -f docker-compose.prod.yml --env-file .env.production ps | grep -E "(auth-service|pet-service|user-service|gateway)"

echo ""
echo "✨ Fix script completed!"
echo ""
echo "📝 Next steps:"
echo "1. Check if tables exist:"
echo "   docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c '\dt'"
echo ""
echo "2. Check auth service logs:"
echo "   docker logs pet-auth-service --tail 50"
echo ""
echo "3. Test from your browser:"
echo "   http://$(curl -s ifconfig.me):3000/api/v1/auth/login"
echo ""
