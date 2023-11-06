const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_schema", "root", "123456", {
  dialect: "mysql",
  host: "localhost",
  port: "3307",
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_schema",
//   port: "3307",
//   password: "123456",
// });

// module.exports = pool.promise();
