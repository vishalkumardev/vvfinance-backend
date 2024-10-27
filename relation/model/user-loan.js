const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const LoansUser = sequelize.define("loansUser", {
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = LoansUser;
