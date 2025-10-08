const grpc = require("@grpc/grpc-js");
// The below library uses proto-js that does the compiling of the proto file for us synchronously
const protoLoader = require("@grpc/proto-loader");

// This will load the proto file in memory
const packageDef = protoLoader.loadSync("todo.proto", {});

// This will load the todoPackage definition in an object. Here, we are loading and compiling the proto file in memory
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Here, we get the package which can be used to instantiate service and also get access to messages
const todoPackage = grpcObject.todoPackage;

// creating the client
// The server can listen to any request whether it is localhost or comming from some other IP
// For our demo, the client will request the server at localhost as both client and server are running at a single machine
const client = new todoPackage.Todo(
  "localhost:4578",
  grpc.credentials.createInsecure()
);

// createTodo() accepts TodoText type object as params
// We can just pass JSON of type of TodoText schema and gRPC will automatically understands it in TodoText type
client.createTodo(
  {
    text: "Go to Gym at 5:00 am",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }
    console.log("Response:", JSON.stringify(response));
  }
);

// sending multiple todos
["Do laundary", "Do utensils", "Go Strech", "Drink Water"].map((item, i) => {
  client.createTodo(
    {
      text: item,
    },
    (err, response) => {
      if (err) {
        console.error(err);
      }
      console.log(`Response no. ${i + 1}:`, JSON.stringify(response));
    }
  );
});

//reading todos
client.readTodos({}, (err, response) => {
  if (err) {
    console.error(err);
  }
  console.log("Response for readTodos:", JSON.stringify(response));
});

// reading streams data from server
const call = client.readTodosStream(); // This is not a call back
call.on("data", (item) => {
  console.log("Recieved item from server", JSON.stringify(item));
}); // we will be listening to events here

call.on("end", (e) => console.log("Server done sending data"));
