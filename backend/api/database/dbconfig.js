const { Sequelize } = require("sequelize");
const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully");
})();

module.exports = sequelize;
