# Multi-stage build for gateway in monorepo

FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files for workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy shared package
COPY backend/shared ./backend/shared

# Copy gateway files
COPY backend/gateway ./backend/gateway

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build shared package first
RUN pnpm --filter @pet-platform/shared run build

# Build gateway
RUN pnpm --filter @pet-platform/gateway run build

# Production image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy shared package
COPY backend/shared ./backend/shared

# Copy gateway package
COPY backend/gateway ./backend/gateway

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built shared package from builder
COPY --from=builder /app/backend/shared/dist ./backend/shared/dist

# Copy built gateway from builder
COPY --from=builder /app/backend/gateway/dist ./backend/gateway/dist

# Set working directory to gateway
WORKDIR /app/backend/gateway

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check - simply verify the process is listening
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode < 500 ? 0 : 1)}).on('error', () => process.exit(1))"

# Start
CMD ["node", "dist/main.js"]
