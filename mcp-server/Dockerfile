# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root and server package files
COPY package*.json ./
COPY mcp-server/package*.json ./mcp-server/

# Install all dependencies
RUN npm install

# Copy server source code
COPY mcp-server/ ./mcp-server/

# Build the NestJS application
RUN npm run build --workspace=mcp-server

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy build artifacts from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/mcp-server/dist ./mcp-server/dist
COPY --from=builder /app/mcp-server/package.json ./mcp-server/

EXPOSE 3000

# We need to specify the server workspace in the CMD
CMD ["node", "mcp-server/dist/main"]
