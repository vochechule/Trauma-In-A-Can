# Stage 1: Dependencies
FROM node:20-alpine AS deps

WORKDIR /app
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 3: Production
FROM node:20-alpine

WORKDIR /app
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]
