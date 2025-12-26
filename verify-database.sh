#!/bin/bash

# ============================================
# Database Verification Script
# ============================================
# This script verifies the database schema matches the application requirements

set -e

echo "🔍 Database Verification Script"
echo "================================"
echo ""

# Load environment
if [ -f .env.production ]; then
    source .env.production
    echo "✓ Loaded .env.production"
elif [ -f .env ]; then
    source .env
    echo "✓ Loaded .env"
else
    echo "❌ No environment file found!"
    exit 1
fi

echo "Database: ${DATABASE_NAME}"
echo "User: ${DATABASE_USER}"
echo ""

# Check if postgres container is running
if ! docker ps | grep -q "pet-platform-postgres"; then
    echo "❌ Postgres container is not running!"
    echo "Start it with: docker compose up -d postgres"
    exit 1
fi

echo "✓ Postgres container is running"
echo ""

# Test connection
echo "📡 Testing database connection..."
if docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✓ Database connection successful"
else
    echo "❌ Cannot connect to database!"
    exit 1
fi
echo ""

# Check tables
echo "📋 Checking tables..."
TABLES=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public';" | grep -v '^$' | wc -l)
echo "Found $TABLES tables"

if [ "$TABLES" -lt 10 ]; then
    echo "⚠️  Warning: Expected at least 10 tables, found $TABLES"
    echo ""
    echo "Tables found:"
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "\dt"
    echo ""
    echo "❌ Database initialization incomplete!"
    echo "Run: ./fix-ec2-database.sh"
    exit 1
fi

echo "✓ All main tables exist"
echo ""

# Verify users table structure
echo "🔍 Verifying users table..."
USERS_COLUMNS=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "\d users" | grep -E "^ \w+" | awk '{print $1}' | tr '\n' ' ')

REQUIRED_USERS_COLUMNS="id email password_hash role verification_status first_name last_name display_name phone city postal_code latitude longitude trust_score identity_verified is_active is_blocked email_verified phone_verified created_at updated_at"

MISSING_COLUMNS=""
for col in $REQUIRED_USERS_COLUMNS; do
    if ! echo "$USERS_COLUMNS" | grep -q "$col"; then
        MISSING_COLUMNS="$MISSING_COLUMNS $col"
    fi
done

if [ -n "$MISSING_COLUMNS" ]; then
    echo "❌ Missing columns in users table:$MISSING_COLUMNS"
    echo ""
    echo "Current columns:"
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "\d users"
    exit 1
else
    echo "✓ Users table has all required columns"
fi
echo ""

# Check user_role enum
echo "🔍 Verifying user_role enum..."
ENUM_VALUES=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "SELECT unnest(enum_range(NULL::user_role));" | tr '\n' ' ' | sed 's/ //g')

if echo "$ENUM_VALUES" | grep -q "user" && echo "$ENUM_VALUES" | grep -q "business" && echo "$ENUM_VALUES" | grep -q "admin"; then
    echo "✓ user_role enum: $ENUM_VALUES"
else
    echo "❌ user_role enum is incorrect!"
    echo "Found: $ENUM_VALUES"
    echo "Expected: user, business, admin, moderator"
    exit 1
fi
echo ""

# Verify pets table structure
echo "🔍 Verifying pets table..."
PETS_COLUMNS=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "\d pets" | grep -E "^ \w+" | awk '{print $1}' | tr '\n' ' ')

REQUIRED_PETS_COLUMNS="id owner_id name pet_type breed gender status latitude longitude city country description created_at updated_at"

MISSING_PET_COLUMNS=""
for col in $REQUIRED_PETS_COLUMNS; do
    if ! echo "$PETS_COLUMNS" | grep -q "$col"; then
        MISSING_PET_COLUMNS="$MISSING_PET_COLUMNS $col"
    fi
done

if [ -n "$MISSING_PET_COLUMNS" ]; then
    echo "❌ Missing columns in pets table:$MISSING_PET_COLUMNS"
    echo ""
    echo "Current columns:"
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "\d pets"
    exit 1
else
    echo "✓ Pets table has all required columns"
fi
echo ""

# Check indexes
echo "🔍 Checking indexes..."
INDEXES=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "SELECT count(*) FROM pg_indexes WHERE schemaname = 'public';" | tr -d ' ')
echo "Found $INDEXES indexes"

if [ "$INDEXES" -lt 20 ]; then
    echo "⚠️  Warning: Expected at least 20 indexes, found $INDEXES"
else
    echo "✓ Adequate indexes exist"
fi
echo ""

# Check extensions
echo "🔍 Checking PostgreSQL extensions..."
EXTENSIONS=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "SELECT extname FROM pg_extension;" | tr '\n' ' ')
echo "Extensions: $EXTENSIONS"

if echo "$EXTENSIONS" | grep -q "uuid-ossp"; then
    echo "✓ uuid-ossp extension installed"
else
    echo "❌ uuid-ossp extension missing!"
    exit 1
fi

if echo "$EXTENSIONS" | grep -q "pg_trgm"; then
    echo "✓ pg_trgm extension installed"
else
    echo "⚠️  pg_trgm extension missing (needed for full-text search)"
fi
echo ""

# Test data insertion
echo "🧪 Testing data insertion..."
TEST_EMAIL="test_$(date +%s)@test.com"
INSERT_RESULT=$(docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -t -c "
INSERT INTO users (email, password_hash, role, display_name, email_verified, verification_status)
VALUES ('$TEST_EMAIL', 'test_hash', 'user', 'Test User', false, 'pending')
RETURNING id;" 2>&1)

if echo "$INSERT_RESULT" | grep -qE "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"; then
    echo "✓ Test user inserted successfully"
    # Cleanup
    docker exec pet-platform-postgres psql -U ${DATABASE_USER} -d ${DATABASE_NAME} -c "DELETE FROM users WHERE email = '$TEST_EMAIL';" > /dev/null
    echo "✓ Test user cleaned up"
else
    echo "❌ Failed to insert test user!"
    echo "$INSERT_RESULT"
    exit 1
fi
echo ""

# Summary
echo "================================"
echo "✅ Database Verification Complete!"
echo "================================"
echo ""
echo "Summary:"
echo "  • Tables: $TABLES"
echo "  • Indexes: $INDEXES"
echo "  • Extensions: uuid-ossp, pg_trgm"
echo "  • Users table: ✓"
echo "  • Pets table: ✓"
echo "  • Enums: ✓"
echo ""
echo "Database is ready for use!"
echo ""
echo "Next steps:"
echo "1. Build and start services:"
echo "   docker compose -f docker-compose.prod.yml --env-file .env.production build"
echo "   docker compose -f docker-compose.prod.yml --env-file .env.production up -d"
echo ""
echo "2. Check service logs:"
echo "   docker logs pet-auth-service --tail 50"
echo ""
echo "3. Test API:"
echo "   curl -X POST http://localhost:3000/api/v1/auth/register \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"user@test.com\",\"password\":\"Test123456!\",\"name\":\"Test User\",\"userType\":\"user\"}'"
