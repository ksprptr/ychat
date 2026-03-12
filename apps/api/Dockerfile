# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app/api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install the application dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Copy env file
COPY .env .env

# Build the NestJS application
RUN pnpm run build

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["pnpm", "run", "start:prod"]