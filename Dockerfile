FROM node:22.11.0-alpine

WORKDIR /app

# Copiar todo antes de instalar dependencias
COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm", "start"]
