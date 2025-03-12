// Define a "User" model that maps to the "users" table
import sequelize from "../index.js";
import { DataTypes } from "sequelize";
const RoleQR = sequelize.define(
  "role_qr",
  {
    role_qr_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    event_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    expiry_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    qr_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qr_is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    max_scans: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 10000009,
    },
  },
  {
    timestamps: false,
  }
);

// Sync the model to create the table if it doesn't exist
async function createTable() {
  await RoleQR.sync({ force: true }); // force: true will drop the table if it already exists
  console.log("role_qr table has been created");
}

createTable();

export { RoleQR };
