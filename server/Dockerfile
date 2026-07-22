FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY server/package.json ./
RUN npm install --production --silent

# Copy server source
COPY server/ ./

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
