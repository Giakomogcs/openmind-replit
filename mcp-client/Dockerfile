# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root and client package files
COPY package*.json ./
COPY mcp-client/package*.json ./mcp-client/
COPY mcp-client/.env.example ./mcp-client/.env

# Install all dependencies
RUN npm install

# Copy client source code
COPY mcp-client/ ./mcp-client/

# Build the client application
RUN npm run build --workspace=mcp-client

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the build output from the builder stage
COPY --from=builder /app/mcp-client/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
