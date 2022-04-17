FROM node:17-slim as builder

WORKDIR /home/node/app

RUN apt-get update \
  && apt-get install -y bash wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package.json package-lock.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

USER node

FROM node:17-slim AS runtime

RUN apt-get update \
  && apt-get install -y bash wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

COPY --chown=node:node --from=builder /home/node/app/dist ./dist
COPY --chown=node:node ./.docker/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

USER node




