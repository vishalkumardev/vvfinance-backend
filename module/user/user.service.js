const user = require("./user.model");
const { hashPassword } = require("../../utils/Hashing");
const { getCount } = require("../../utils/getCount");
const { getPaginatedData } = require("../../utils/pagination");

const saveUser = async (data) => {
  try {
    const hash = hashPassword(data.password);
    const User = new user({ ...data, password: hash });
    const UserRegister = await User.save();
    return UserRegister;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (email) => {
  try {
    const User = await user.findOne({
      where: {
        email: email,
      },
    });
    return User;
  } catch (error) {
    console.error(error);
  }
};

const getAllUser = async (data) => {
  const pageSize = data.size ?? 15;
  const page = data.page ?? 1;
  const filter = data.filter ?? {};
  try {
    const User = await getPaginatedData(
      pageSize,
      page,
      user,
      filter,
      "",
      [],
      ["name", "address", "phone", "userId", "email"],
      true,
      "createdAt",
      "DESC"
    );
    return User;
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = async (data) => {
  try {
    const update = await user.update(
      { _id: data._id },
      { password: hashPassword(data.password) }
    );
    return update;
  } catch (error) {
    console.error(error);
  }
};

const fetchDashboard = async (data, user) => {
  const time = data?.time ?? 0;
  try {
    // const sellTotal = await getCount(Sell, time, "sellingPrice", user);
    // const repairingTotal = await getCount(Repairing, time, "price", user);

    return {
      sell: 0,
      repairing: 0,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveUser,
  getUser,
  getAllUser,
  updatePassword,
  fetchDashboard,
};
