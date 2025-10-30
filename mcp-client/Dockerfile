# Stage 1: Build the React application
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

# Build the client application
RUN npm run build --workspace=mcp-client

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the build output from the builder stage
COPY --from=builder /app/mcp-client/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY mcp-client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
