FROM arm64v8/node:8-alpine
COPY ./qemu-aarch64-static /usr/bin/qemu-aarch64-static

RUN mkdir -p /usr/src
WORKDIR /usr/src

ENV PORT 3000
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn global add pm2

# Bundle app source
COPY ./package.json /usr/src/package.json
COPY ./yarn.lock /usr/src/yarn.lock

RUN yarn install --production

COPY ./static /usr/src/static
COPY ./.next /usr/src/.next
COPY ./server.js /usr/src/server.js
COPY ./pm2.json /usr/src/pm2.json

EXPOSE 3000

CMD [ "pm2-docker", "start", "pm2.json" ]
