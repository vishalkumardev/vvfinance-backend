const express = require("express");
const router = express.Router();

const userRoute = require("./users");
const loanRoute = require("./loan");

router.use("/user", userRoute);
router.use("/loan", loanRoute);

module.exports = router;
