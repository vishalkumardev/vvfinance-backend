const Validator = require("validatorjs");

const validateUser = (data) => {
  const rules = {
    name: "required|string",
    email: "required|email",
    password: "required|string|min:6",
  };

  const validator = new Validator(data, rules);
  return validator;
};

const validateLogin = async (uid) => {
  const rules = {
    email: "required|email",
    password: "required|string|min:6",
  };

  const validator = new Validator(uid, rules);
  return validator;
};

const validateForgotPassword = async (data) => {
  const rules = {
    email: "required|email",
  };

  const validator = new Validator(data, rules);
  return validator;
};

const validateChangePassword = async (data) => {
  const rules = {
    password: "required|string|min:6",
  };

  const validator = new Validator(data, rules);
  return validator;
};

module.exports = {
  validateUser,
  validateLogin,
  validateForgotPassword,
  validateChangePassword,
};
