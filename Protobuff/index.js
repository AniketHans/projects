// Importing the schema
const Schema = require("./generated/employees_pb");
const fs = require("fs");
// Creating our first employee
const employee1 = new Schema.Employee();
employee1.setId(101);
employee1.setName("Employee 1");
employee1.setSalary(197887.9);

const employee2 = new Schema.Employee();
employee2.setId(102);
employee2.setName("Employee 2");
employee2.setSalary(89787.9);

const employee3 = new Schema.Employee();
employee3.setId(103);
employee3.setName("Employee 3");
employee3.setSalary(99776.9);

// console.log("Employee name is", employee1.getName());

// Creating employees
const employees = new Schema.Employees();
// Adding multiple employee to employees array
employees.addEmployees(employee1);
employees.addEmployees(employee2);
employees.addEmployees(employee3);
console.log("Employees data:", employees.array);

//serializing the data into binary
const serializeIntoBinary = employees.serializeBinary();
console.log("Serialized Binary data:", serializeIntoBinary);
fs.writeFileSync("employees-binary", serializeIntoBinary);

// deserialize binary into data
const deserializeIntoData =
  Schema.Employees.deserializeBinary(serializeIntoBinary);
console.log("Deserialized data", deserializeIntoData);
console.log("Deserialized data to string", deserializeIntoData.toString());
