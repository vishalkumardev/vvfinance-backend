const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   database: "vvfinance",
//   username: "avnadmin",
//   password: "AVNS_2AOixHKPrVvgjt43SGJ",
//   host: "mysql-1cedb6eb-quizkar4-3a4b.l.aivencloud.com",
//   port: "24308",
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
//   benchmark: true,
// });

const sequelize = new Sequelize({
  database: "vvfinance",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
  port: "3306",
  benchmark: true,
});

try {
  sequelize.sync({ logging: false, alter: true }).then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
