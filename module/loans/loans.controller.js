const itemService = require("./loans.service");

// Get item by ID
const getItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await itemService.getItemById(itemId);
    if (!item) {
      return res
        .status(200)
        .json({ success: false, message: "Item not found" });
    }
    return res.status(200).json({
      success: true,
      data: { item },
      message: "Loan get successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  const data = {
    ...req.body,
    ...req.query,
  };

  try {
    const items = await itemService.getAllItems(data);
    return res
      .status(200)
      .json({ success: true, data: items, message: "Loans get successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

// Create a new item
const createItem = async (req, res) => {
  const files = req.files;

  try {
    const item = await itemService.addItem(files);

    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(201).json({
      success: true,
      message: "File Upload Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

// Update an item
const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const data = req.body;
  try {
    const item = await itemService.updateItem(itemId, data);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    return res.status(200).json({
      success: true,
      data: item,
      message: "Loan updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await itemService.deleteItem(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    return res.status(201).json({
      success: true,
      message: "Loan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

const searchItems = async (req, res) => {
  const agreementId = req.body;
  const user = req.user;

  try {
    const items = await itemService.searchItems(agreementId, user);

    if (!items) {
      return res.status(200).json({ success: false, message: "No Loan found" });
    }

    return res.status(200).json({
      success: true,
      data: items,
      message: "Loan found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: {},
    });
  }
};

module.exports = {
  getItemById,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
};
