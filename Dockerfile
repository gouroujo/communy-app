FROM arm64v8/node:8-alpine
COPY ./qemu-aarch64-static /usr/bin/qemu-aarch64-static

RUN mkdir -p /usr/src
WORKDIR /usr/src

ENV PORT 3000
ENV NODE_ENV production


# Bundle app source
COPY ./.next /usr/src/.next
COPY ./server.js /usr/src/server.js

EXPOSE 3000

CMD ["node", "server.js"]
