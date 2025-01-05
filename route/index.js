const express = require("express");
const router = express.Router();

const userRoute = require("./users");
const loanRoute = require("./loan");
const telecallRoute = require("./call");

router.use("/user", userRoute);
router.use("/loan", loanRoute);
router.use("/tellecall", telecallRoute);

module.exports = router;
