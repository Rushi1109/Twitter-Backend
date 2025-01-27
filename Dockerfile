# Lightweight, minimal linux distribution ~5MB
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# We use npm ci instead of npm install to avoid packages updating accidentally
RUN npm ci

# Copy all the files to inside container
COPY . .

EXPOSE 3000

CMD ["npm", "run","start"]
