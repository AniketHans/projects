// Define a "User" model that maps to the "users" table
import sequelize from "../index.js";
import { DataTypes } from "sequelize";
const Role = sequelize.define(
  "role",
  {
    role_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true,
      initialAutoIncrement: 10000,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    organization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    initialAutoIncrement: 10000,
    timestamps: false,
  }
);

// Sync the model to create the table if it doesn't exist
async function createTable() {
  await Role.sync({ force: true }); // force: true will drop the table if it already exists
  console.log("role table has been created");
}

createTable();

export { Role };
