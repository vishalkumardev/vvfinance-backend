const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const Loan = sequelize.define(
  "Loan",
  {
    loanId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    registration_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agreementid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emi_amt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_due: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chasisnum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enginenum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bm_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rrm_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinator_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bm_mobile_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rrm_mobile_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinater_mobile_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sec17: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seasoning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tbr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "isDeleted",
    tableName: "loans",
    // this ensures createdAt and updatedAt fields are added
  }
);

module.exports = Loan;
