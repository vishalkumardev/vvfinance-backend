const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const TeleCall = sequelize.define(
  "TeleCall",
  {
    teleCallId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    borrowerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalDue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disbursement_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disbursement_amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dpd: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tenure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    npaDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emiPaidCount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cust_mailing_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cust_permanent_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyaddress1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyaddress2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyaddress3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    societyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productClass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emiAmount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfSarfaesi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastDateofPayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    principal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tellecalls",
    paranoid: true,
    deletedAt: "isDeleted",
    timestamps: true, // this ensures createdAt and updatedAt fields are added
  }
);

module.exports = TeleCall;
