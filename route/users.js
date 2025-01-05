const express = require("express");
const router = express.Router();

const {
  login,
  add,
  resetLink,
  get,
  getAll,
  changePassword,
  dashboard,
  updateAccountStatus,
} = require("../module/user/user.controller");
const { verifyToken } = require("../utils/generateToken");

router.post("/", add);
router.post("/login", login);
router.post("/forgot", resetLink);
router.get("/profile", verifyToken, get);
router.post("/get", verifyToken, getAll);
router.get("/reset/:_id", changePassword);
router.post("/dashboard", verifyToken, dashboard);
router.patch("/toggle", verifyToken, updateAccountStatus);

module.exports = router;
