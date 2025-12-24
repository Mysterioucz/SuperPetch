# Multi-stage build for auth-service in monorepo

FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files for workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy shared package
COPY backend/shared ./backend/shared

# Copy auth-service files
COPY backend/services/auth-service ./backend/services/auth-service

# Install all dependencies (this will handle workspace links)
RUN pnpm install --frozen-lockfile

# Build shared package first
RUN pnpm --filter @pet-platform/shared run build

# Build auth-service
RUN pnpm --filter @pet-platform/auth-service run build

# Production image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy shared package
COPY backend/shared ./backend/shared

# Copy auth-service package
COPY backend/services/auth-service ./backend/services/auth-service

# Install production dependencies (workspace aware)
RUN pnpm install --prod --frozen-lockfile

# Copy built shared package from builder
COPY --from=builder /app/backend/shared/dist ./backend/shared/dist

# Copy built auth-service from builder
COPY --from=builder /app/backend/services/auth-service/dist ./backend/services/auth-service/dist

# Set working directory to service
WORKDIR /app/backend/services/auth-service

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + process.env.PORT + '/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start
CMD ["node", "dist/main.js"]
