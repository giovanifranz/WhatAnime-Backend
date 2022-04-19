FROM node:17.9.0-slim as builder

WORKDIR /home/node/app

RUN apt-get update \
  && apt-get install -y bash wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package.json package-lock.json ./

RUN npm ci --only=development

COPY . .

RUN npm run prisma:generate

RUN npm run build

USER node
