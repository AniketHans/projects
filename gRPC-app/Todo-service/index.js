const grpc = require("@grpc/grpc-js");
// The below library uses proto-js that does the compiling of the proto file for us synchronously
const protoLoader = require("@grpc/proto-loader");

// This will load the proto file in memory
const packageDef = protoLoader.loadSync("todo.proto", {});

// This will load the todoPackage definition in an object. Here, we are loading and compiling the proto file in memory
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Here, we get the package which can be used to instantiate service and also get access to messages
const todoPackage = grpcObject.todoPackage;

// Creating a server that will listen at some port to cater the client requests
const server = new grpc.Server();

// Insecure connection means it will uncrypted via HTTP
// with 0.0.0.0 it will listen to all the interfaces either localhost or external ip
server.bindAsync(
  "0.0.0.0:4578",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server listening on port ${port}`);
    // No explicit server.start() call needed
  }
);

// Adding Todo service to the server
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

const todos = [];

// methods in gRPC all takes 2 params:
// 1:- call (here you get access to the whole call made by client i.e whole tcp connection)
// 2:- callback (used to send response back to the client)
function createTodo(call, callback) {
  console.log(call);
  const todoItem = {
    id: -Date.now(),
    text: call.request.text,
  };
  todos.push(todoItem); // We get the actual object that the client sends in request property of the call object

  // returning the response to client
  // the length of the content is auto calculated so we can send null
  callback(null, todoItem);
}
function readTodos(call, callback) {
  callback(null, {
    todoItems: todos,
  });
}

function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}
