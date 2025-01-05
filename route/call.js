const express = require("express");
const router = express.Router();
const itemController = require("../module/telecall/telecall.controller");
const { verifyToken } = require("../utils/generateToken");

// GET all items
router.post("/get", verifyToken, itemController.getAllItems);

// GET item by ID
router.get("/:id", verifyToken, itemController.getItemById);

// POST create a new item
router.post("/", verifyToken, itemController.createItem);

// PUT update an existing item
router.patch("/:id", verifyToken, itemController.updateItem);

// DELETE delete an item
router.delete("/:id", verifyToken, itemController.deleteItem);

//search for the loans
router.get("/search/:id", verifyToken, itemController.searchItems);

module.exports = router;
