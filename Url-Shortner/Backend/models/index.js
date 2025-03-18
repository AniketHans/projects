import { Sequelize } from "sequelize";

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize("url_shortner", "user1", "password", {
  host: "localhost",
  port: 3308,
  dialect: "mysql", // or 'postgres', 'sqlite', 'mssql'
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
