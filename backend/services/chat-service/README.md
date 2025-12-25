# chat-service

## Description

chat-service for Pet Platform

## Installation

```bash
pnpm install
```

## Running the service

```bash
# Development
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
```

## Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## API Documentation

Swagger documentation available at: http://localhost:3005/api/docs

## Health Check

http://localhost:3005/api/v1/health
