import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const urlSchema = sequelize.define(
  "urls",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    short_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    redirect_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visit_count: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
  },
  {
    timestamps: true,
  }
);

async function createTable() {
  await urlSchema.sync({ force: false }); // force: true will drop the table if it already exists
  console.log("urls table has been created");
}

createTable();

export { urlSchema };
