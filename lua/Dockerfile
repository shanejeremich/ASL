# Use the official Lua image from Docker Hub
FROM alpine:latest

# Install Lua and LuaRocks
RUN apk update && \
    apk add --no-cache lua lua-dev

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Specify the command to run the Lua script
CMD ["lua", "hello.lua"]
