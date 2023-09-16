# Use an official Node runtime as the parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Set the environment to development
ENV NODE_ENV development

# Run the application in development mode when the container launches
CMD ["npm", "run", "dev"]