FROM node:17.9-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm run migrate:deploy
RUN npm run prisma:generate

CMD ["node", "dist/main"]
