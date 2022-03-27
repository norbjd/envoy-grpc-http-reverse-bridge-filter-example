const PROTO_PATH = __dirname + "/helloworld.proto";

const protobuf = require("protobufjs");
const express = require("express");

const app = express();
app.use(express.raw({ type: "application/grpc" }));

async function run() {
  const root = await protobuf.load(PROTO_PATH);

  app.post("/helloworld.greeter/SayHello", (req, res) => {
    var message = "Hello";

    if (
      req.body !== undefined &&
      req.body instanceof Buffer &&
      req.body.length != 0
    ) {
      const HelloRequest = root.lookupType("helloworld.HelloRequest");
      const helloReq = HelloRequest.decode(req.body);
      message += " " + helloReq.name;
    }

    res.header("Content-Type", "application/grpc");

    const HelloReply = root.lookupType("helloworld.HelloReply");
    res.send(HelloReply.encode({ message: message }).finish());
    res.end();
  });

  app.listen(8080);
}

run();
