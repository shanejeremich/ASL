FROM alpine:latest
RUN apk update && \
    apk add --no-cache lua lua-dev
WORKDIR /usr/src/app
COPY . .
CMD ["lua", "hello.lua"]
