# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app/web

# Copy package files
COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy application source code
COPY . .

# Copy env file
COPY .env .env

# Build the application
RUN pnpm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", ".next/standalone/server.js"]
