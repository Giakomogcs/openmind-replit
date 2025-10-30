# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy workspace package files
COPY mcp-server/package*.json ./mcp-server/
COPY mcp-client/package*.json ./mcp-client/

# Install all dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the NestJS application
RUN npm run build --workspace=mcp-server

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy build artifacts and dependencies from the builder stage
COPY --from=builder /app/mcp-server/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/mcp-server/node_modules ./mcp-server/node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
