FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the entire source code from the src directory
COPY src/ ./

# Copy the package.json and package-lock.json files from the parent directory (angular-node-api)
COPY package*.json ./

COPY index.js ./
# Install dependencies
RUN npm install

# Set environment variables
ENV PORT=3003

# Expose the container port
EXPOSE 3003

# Run the application
CMD ["npm","start"]
