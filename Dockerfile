# ------------------------------
# Build React app
# ------------------------------
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# ------------------------------
# Serve with Nginx
# ------------------------------
FROM nginx:alpine

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inject runtime env
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
