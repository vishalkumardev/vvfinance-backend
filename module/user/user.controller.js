const {
  saveUser,
  getUser,
  getAllUser,
  updatePassword,
  fetchDashboard,
  toggleUserStatus,
} = require("./user.service");
const { comparePassword } = require("../../utils/Hashing");
const { generateToken } = require("../../utils/generateToken");
const {
  validateUser,
  validateLogin,
  validateForgotPassword,
  validateChangePassword,
} = require("./user.validation");

const add = async (req, res) => {
  try {
    const data = req.body;
    const validator = validateUser(data);

    if (validator.fails()) {
      return res.status(400).json({
        success: false,
        message: validator.errors,
      });
    }

    const userExist = await getUser(data.email);

    if (userExist) {
      return res.status(200).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const user = await saveUser(data);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        data: {
          uid: user.uid,
        },
      });
    }
  } catch (error) {
    console.error("Error in add:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const get = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await getUser(email);

    if (user) {
      return res.status(200).json({
        success: true,
        data: {
          user,
        },
        message: "User retrieved Successfully",
      });
    }

    return res.status(200).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    console.error("Error in get:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const validator = await validateLogin(data);

    if (validator.fails()) {
      return res.status(400).json({
        success: false,
        message: validator.errors,
      });
    }

    const user = await getUser(data.email);

    if (!user?.dataValues?.active) {
      return res.status(200).json({
        success: false,
        message: "You are not authorized to Use !",
      });
    }

    if (user && comparePassword(data.password, user.password)) {
      const token = generateToken(user);
      return res.status(200).json({
        success: true,
        message: "User Login Successful",
        data: {
          token,
          role: user?.role,
        },
      });
    }

    return res.status(200).json({
      success: false,
      message: "Wrong Credentials",
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const resetLink = async (req, res) => {
  try {
    const data = req.body;
    const validator = await validateForgotPassword(data);

    if (validator.fails()) {
      return res.status(400).json({
        success: false,
        message: validator.errors,
      });
    }

    const user = await getUser(data.email);

    if (user) {
      const link = `http://localhost:5000/user/reset/${user._id}`;
      return res.status(200).json({
        success: true,
        message: "Reset Link Sent",
        data: {
          link,
        },
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    console.error("Error in resetLink:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const validator = await validateChangePassword(data);

    if (validator.fails()) {
      return res.status(400).json({
        success: false,
        message: validator.errors,
      });
    }

    const updated = await updatePassword(data);

    if (updated) {
      return res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Password not Updated",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAll = async (req, res) => {
  const data = { ...req.query, ...req.data };
  try {
    const user = await getAllUser(data);

    if (user) {
      return res.status(200).json({
        success: true,
        data: user,
        message: "Users retrieved Successfully",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Users Not Found",
    });
  } catch (error) {
    console.error("Error in getAll:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const dashboard = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    const dashboardData = await fetchDashboard(data, user);

    if (dashboardData) {
      return res.status(200).json({
        success: true,
        data: {
          dashboardData,
        },
        message: "Dashboard retrieved Successfully",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Dashboard not found",
    });
  } catch (error) {
    console.error("Error in dashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateAccountStatus = async (req, res) => {
  const userId = req.body.userId;
  try {
    const updated = await toggleUserStatus(userId);
    if (updated) {
      return res.status(200).json({
        success: true,
        message: "Account Status Updated Successfully",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Account Status not Updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  add,
  login,
  get,
  getAll,
  resetLink,
  changePassword,
  dashboard,
  updateAccountStatus,
};
