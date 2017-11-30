FROM arm64v8/node:8-alpine
COPY ./qemu-aarch64-static /usr/bin/qemu-aarch64-static

RUN mkdir -p /usr/src
WORKDIR /usr/src

ENV PORT 3000
ENV NODE_ENV production


# Bundle app source
COPY ./static /usr/src/static
COPY ./.next /usr/src/.next
COPY ./server.js /usr/src/server.js
COPY ./package.json /usr/src/package.json
COPY ./yarn.lock /usr/src/yarn.lock

RUN yarn install --production

EXPOSE 3000

CMD ["node", "server.js"]
