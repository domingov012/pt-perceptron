# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .

RUN npm install
# Copy the React app into the container
COPY . .


# Expose the port the React app runs on
EXPOSE 5173

# Serve the React app
CMD ["npm", "run", "dev"]
