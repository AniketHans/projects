# How things work

1. We wrote the `employees.proto` file
2. Then, we ran the following command in terminal to generate the `employees_pb.js` file
   `protoc --js_out=import_style=commonjs,binary:./generated employees.proto`
   - Note: protoc does not support ES6 JS as of now so we have to go which commonjs
3. If you are getting error similar to `protoc-gen-js: Plugin failed with status code 1` then install the `protoc-gen-js` npm package
   `npm install -g protoc-gen-js`
4. Then to use the generated code, we first need to install `google-protobuf` library
5. After creating Employee and Employees, we will be serializing the Employees data into binary format as in protobuf, binaries are sent between the client and the server. The function used here is `serializeBinary()`
6. Since the client and server will use the same proto file to generate the code in their repo langauges, protoc will generate the same functions in their respective languages. So when the data is send from server to client serialized in binary then the client will use the `deserializeBinary` function to deserialize into Employees object
