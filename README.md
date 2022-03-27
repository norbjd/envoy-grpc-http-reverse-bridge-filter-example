# Envoy gRPC - HTTP reverse bridge filter minimal working example

## Server + Envoy

Run with:

```shell
docker-compose up
```

## Client

### Prepare environment

Must be done only once. Generate JS files from proto and install dependencies. From root folder, run:

```shell
docker run --rm -t \
    -v $PWD:/app \
    -w /app/client \
    node:16.14.2-slim \
    sh -c 'npm install -g grpc-tools && \
        grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. -I /app/ /app/helloworld.proto && \
        npm install'
```

### Run

From root folder, run:

```shell
docker run --net=host --rm -v $PWD:/app -w /app/client node:16.14.2-slim node client.js
```

Or from `client/` folder (`cd client/`), you can run `node client.js`.
