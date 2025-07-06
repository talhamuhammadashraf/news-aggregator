# Stage 1: Build the Vite app
FROM node:22-alpine AS builder

# Enable Corepack and activate latest stable Yarn
# RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN yarn build

# Stage 2: Serve the built app using 'serve'
FROM node:22-alpine AS production

WORKDIR /app

# Install 'serve' globally
RUN yarn global add serve

# Copy only the build output
COPY --from=builder /app/dist .

# Serve the build folder
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
