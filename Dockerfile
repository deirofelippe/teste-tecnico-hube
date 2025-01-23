FROM node:21.7.3-alpine3.20

RUN apk update \
    && apk add git netcat-openbsd iproute2-ss tcpdump curl iputils-ping

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node ./ ./

CMD ["/usr/local/bin/npm", "start"]