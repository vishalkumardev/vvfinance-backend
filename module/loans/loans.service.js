const { Op } = require("sequelize");
const LoansUser = require("../../relation/model/user-loan");
const { getPaginatedData } = require("../../utils/pagination");
const User = require("../user/user.model");
const Item = require("./loans.model");
const xlsx = require("xlsx");

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
        registration_no: element["Registration Numbers"] || element["Reg No"],
        customer: element["Customer Name"] || element["Client Name"],
        agreementid: element["Loan No"] || element["Agreement ID"],
        productname: element["Make"] || element["Product Name"],
        emi_amt: element["EMI"] || element["Installment Amount"],
        total_due: element["POS"] || element["Outstanding Amount"],
        chasisnum: element["Chasis Number"] || element["Chassis Num"],
        enginenum: element["Engine Number"] || element["Engine No"],
        bucket: element["Bucket"] || element["Category"],
        bm_name: element["1st Confirmer Name"],
        rrm_name: element["2nd Confirmer Name"],
        coordinator_name: element["3rd Confirmer Name"],
        bm_mobile_no: element["1st Confirmer No"],
        rrm_mobile_no: element["2nd Confirmer No"],
        coordinater_mobile_no: element["3rd Confirmer No"],
        branch: element["Branch"],
        model: element["Model"],
        sec17: element["Sec 17"],
        seasoning: element["Seasoning"],
        tbr: element["TBR"],
        allocation: element["Allocation"],
        address: element["Address"],
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
  try {
    const items = await getPaginatedData(
      pageSize,
      page,
      Item,
      filter,
      "",
      [],
      [
        "loanId",
        "registration_no",
        "customer",
        "agreementid",
        "productname",
        "emi_amt",
        "total_due",
        "chasisnum",
        "enginenum",
        "bucket",
        "bm_name",
        "rrm_name",
        "coordinator_name",
        "bm_mobile_no",
        "rrm_mobile_no",
        "coordinater_mobile_no",
        "branch",
        "model",
        "sec17",
        "seasoning",
        "tbr",
        "allocation",
        "address",
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

const getItemById = async (loanId) => {
  try {
    const item = await Item.findOne({
      where: {
        agreementid: loanId,
      },
      include: [
        {
          model: User,
          attributes: ["name", "phone"],
          as: "users",
          through: {
            model: LoansUser,
            attributes: ["count"],
          },
        },
      ],
    });
    return item;
  } catch (error) {
    throw error;
  }
};

const updateItem = async (loanId, data) => {
  try {
    const [updated] = await Item.update(data, {
      where: { agreementid: loanId },
    });
    if (updated) {
      const updatedItem = await Item.findByPk(loanId);
      return updatedItem;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (loanId) => {
  try {
    const deleted = await Item.destroy({
      where: { agreementid: loanId },
    });
    return deleted;
  } catch (error) {
    throw error;
  }
};

const searchItems = async (data, user) => {
  const loanId = data?.loanId;

  const location = {
    type: "Point",
    coordinates: [data?.longitude, data?.latitude],
  };

  try {
    const item = await Item.findOne({
      where: {
        [Op.or]: {
          agreementid: loanId,
          registration_no: loanId,
        },
      },
    });

    if (item) {
      const data = item.toJSON();
      const isExist = await LoansUser.findOne({
        where: { LoanLoanId: data?.loanId, userUserId: user?.userId },
      });

      if (isExist) {
        await LoansUser.increment("count", {
          where: {
            userUserId: user.userId,
            LoanLoanId: data?.loanId,
          },
        });
      } else {
        await LoansUser.create({
          userUserId: user.userId,
          LoanLoanId: data?.loanId,
          location: location,
        });
      }
    }
    return item;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
};
