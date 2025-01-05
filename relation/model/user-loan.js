const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const LoansUser = sequelize.define("loansUser", {
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  location: {
    type: DataTypes.GEOMETRY("POINT"),
    allowNull: true,
  },
});

module.exports = LoansUser;
