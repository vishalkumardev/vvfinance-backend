const Loan = require("../module/loans/loans.model");
const User = require("../module/user/user.model");
const LoansUser = require("./model/user-loan");

Loan.belongsToMany(User, {
  through: LoansUser,
  as: "users",
});

User.belongsToMany(Loan, {
  through: LoansUser,
  as: "loans",
});
