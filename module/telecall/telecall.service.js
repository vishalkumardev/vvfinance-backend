const { Op } = require("sequelize");
const LoansUser = require("../../relation/model/user-loan");
const { getPaginatedData } = require("../../utils/pagination");
const Item = require("./telecall.model");
const xlsx = require("xlsx");
const sequelize = require("../../utils/connection");

const addItem = async (files) => {
  try {
    const filePath = files[0].path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    let arr = [];

    data.forEach(async (element) => {
      arr.push({
        accountNo: element["ACCOUNT NO"],
        district: element["District"],
        city: element["City"],
        borrowerName: element["BORROWER'S NAME"],
        lender: element["Gruh/Bandhan"],
        mobileNumber: element["Mobile No"],
        totalDue: element["Total Due"],
        status: element["Latest Sarfaesi status and the date of the same"],
        disbursement_date: element["DISBURSEMENT_DATE"],
        disbursement_amount: element["DISBURSEMENT_AMOUNT"],
        dpd: element["DPD"] || element["dpd"],
        tenure: element["Tenure in months"],
        npaDate: element["NPA Date"],
        emiPaidCount: element["EMI Paid count"] || element["emiPaidCount"],
        profession: element["Borrower industry / Profession details"],
        cust_mailing_address: element["Cust_mailing_address"],
        cust_permanent_address: element["Cust_permnt_address"],
        propertyaddress1: element["Property address_Address 1"],
        propertyaddress2: element["Property address_Address 2"],
        propertyaddress3: element["Property address_Address 3"],
        societyName: element["SOCIETY_NAME"],
        productClass: element["Prodct Class(Hl/LAP/MORT/REPAIR cts)"],
        emiAmount: element["EMI Amount"],
        dateOfSarfaesi:
          element["Date of Sarfaesi Notice 13(2)"] || element["dateOfSarfaesi"],
        lastDateofPayment:
          element["Last date of Payment"] || element["lastDateofPayment"],
        principal: element["Principal O/S (POS)"],
      });
    });

    const item = await Item.bulkCreate(arr, {
      validate: true,
    });

    return item;
  } catch (error) {
    throw error;
  }
};

const getAllItems = async (data) => {
  const pageSize = data.size ?? 15;
  const page = data.page ?? 1;
  const filter = data.filter ?? {};

  console.log(data);
  try {
    const items = await getPaginatedData(
      pageSize,
      page,
      Item,
      filter,
      "",
      [],
      [
        "teleCallId",
        "accountNo",
        "district",
        "city",
        "borrowerName",
        "lender",
        "mobileNumber",
        "totalDue",
        "status",
        "disbursement_date",
        "disbursement_amount",
        "dpd",
        "tenure",
        "npaDate",
        "emiPaidCount",
        "profession",
        "cust_mailing_address",
        "cust_permanent_address",
        "propertyaddress1",
        "propertyaddress2",
        "propertyaddress3",
        "societyName",
        "productClass",
        "emiAmount",
        "dateOfSarfaesi",
        "lastDateofPayment",
        "principal",
        "createdAt",
        "updatedAt",
        "isDeleted",
      ],
      true,
      "createdAt",
      "DESC"
    );
    return items;
  } catch (error) {
    throw error;
  }
};

const getItemById = async (itemId) => {
  try {
    const item = await Item.findOne({
      where: {
        agreementid: itemId,
      },
    });
    return item;
  } catch (error) {
    throw error;
  }
};

const updateItem = async (itemId, data) => {
  try {
    const [updated] = await Item.update(data, {
      where: { agreementid: itemId },
    });
    if (updated) {
      const updatedItem = await Item.findByPk(itemId);
      return updatedItem;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (itemId) => {
  try {
    const deleted = await Item.destroy({
      where: { agreementid: itemId },
    });
    return deleted;
  } catch (error) {
    throw error;
  }
};

const searchItems = async (itemId, user) => {
  try {
    const item = await Item.findOne({
      where: {
        [Op.or]: {
          agreementid: itemId,
          registration_no: itemId,
        },
      },
    });

    return item;
  } catch (error) {
    throw error;
  }
};

const getAllDistrict = async () => {
  const [data] = await sequelize.query(
    `SELECT DISTINCT district FROM tellecalls;`
  );
  return data;
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
  getAllDistrict,
};
