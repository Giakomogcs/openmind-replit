# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy all source code first
COPY . .

# Install all dependencies
RUN npm install

# Build the NestJS application
RUN npm run build --workspace=mcp-server

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy build artifacts and dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/mcp-server/src/main"]
