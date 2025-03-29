import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const userSchema = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

async function createTable() {
  await userSchema.sync({ force: false }); // force: true will drop the table if it already exists
  console.log("user table has been created");
}

createTable();

export { userSchema };
