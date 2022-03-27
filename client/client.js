const grpc = require("@grpc/grpc-js");

const hello_proto = require("./helloworld_grpc_pb.js");
const { HelloRequest } = require("./helloworld_pb.js");

var target = "localhost:50051";

var client = new hello_proto.GreeterClient(
  target,
  grpc.credentials.createInsecure()
);

var request = new HelloRequest();
request.setName("World");

var metadata = new grpc.Metadata();
metadata.add("Content-Type", "application/grpc");

client.sayHello(request, metadata, function (err, response) {
  if (err !== null) {
    console.error(err);
    process.exit(1);
  }
  console.log("Greeting:", response.getMessage());
});
