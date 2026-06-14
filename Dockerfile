FROM node:18-alpine

# Create app directory
WORKDIR /app

# Use development mode by default
ENV NODE_ENV=development

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# Copy source
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Start in development mode and bind to all interfaces
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
