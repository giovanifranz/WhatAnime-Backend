FROM node:alpine3.14 AS builder

WORKDIR /home/node/app

RUN npm install -g @nestjs/cli@8.0.0

USER root

COPY . .

RUN npm install

RUN npm run build

USER node

FROM node:alpine3.14 AS runtime

RUN apk add --no-cache wget
RUN apk add --no-cache bash

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

COPY --chown=node:node --from=builder /home/node/app/dist ./dist
COPY --chown=node:node ./entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

EXPOSE 5000
