# Bug Report BR-002: CORS Error in Production Deployment

**Status:** ✅ FIXED  
**Severity:** HIGH  
**Date:** 2025-12-26

---

## 1. Problem

Frontend at `http://16.176.200.201:3100` calling API at `http://localhost:3000` causes CORS error:

```
Access to fetch at 'http://localhost:3000/api/v1/auth/login' from origin 
'http://16.176.200.201:3100' has been blocked by CORS policy
```

**Issue:** Frontend hardcoded to call `localhost` instead of public IP, and gateway CORS not configured.

---

## 2. Cause

### Frontend Issue
- `NEXT_PUBLIC_API_URL` not set during Docker build
- Next.js requires environment variables at **BUILD TIME**, not runtime
- Dockerfile missing `ARG` declarations for public env vars

### Gateway Issue
- `CORS_ORIGIN` environment variable not set
- Gateway defaulting to `CORS_ORIGIN="*"` but not allowing specific origin

---

## 3. The Fix

### Step 1: Update Dockerfile
```dockerfile
# Add before RUN pnpm run build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
```

### Step 2: Verify .env.production
```bash
NEXT_PUBLIC_API_URL=http://16.176.200.201:3000
CORS_ORIGIN=http://16.176.200.201:3100
```

### Step 3: Rebuild & Deploy
```bash
docker compose -f docker-compose.prod.yml --env-file .env.production \
  up -d --build frontend gateway
```

### Verification
```bash
# Check frontend has correct API URL in bundle
docker exec frontend grep -r "16.176.200.201:3000" .next/static | head -1

# Check gateway CORS header
curl -I -H "Origin: http://16.176.200.201:3100" \
  http://16.176.200.201:3000/api/v1/auth/health
# Should return: Access-Control-Allow-Origin: http://16.176.200.201:3100
```

---

**Key Takeaway:** Next.js `NEXT_PUBLIC_*` variables must be available during build, not just runtime.