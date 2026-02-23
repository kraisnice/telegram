# Stage 1: Build the React frontend
FROM node:18-alpine AS client-builder

WORKDIR /app/client

COPY client/package*.json ./

RUN npm ci

COPY client/ .

RUN npm run build

# Stage 2: Build the backend and serve both
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend code
COPY app.js ./
COPY bin ./bin
COPY routes ./routes
COPY data ./data
COPY client/public ./client/public

# Copy built frontend from stage 1
COPY --from=client-builder /app/client/dist ./client/dist

# Expose port 3000 (adjust if your app uses different port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
