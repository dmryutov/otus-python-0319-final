# Stage 1 - build frontend app
FROM node:10-alpine as frontend-deps

WORKDIR /app/

COPY frontend/package.json frontend/package-lock.json /app/
RUN npm install -g @vue/cli --quiet
RUN npm install --quiet

COPY frontend /app/
COPY .env /app/.env
RUN npm run build

# Stage 2 - nginx & frontend
FROM nginx:alpine

COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY --from=frontend-deps /app/dist/ /dist/

CMD ["nginx", "-g", "daemon off;"]