const Data = require("../models/data.model");
const History = require("../models/history.model");

// Lấy tất cả data
exports.getAllData = async (req, res) => {
  try {
    const query = req.user.level === "admin" ? {} : { user: req.user.id };
    const data = await Data.find(query).populate("itemType user");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo data mới
exports.createData = async (req, res) => {
  const { itemType, company, amount, note } = req.body;
  const data = new Data({
    itemType,
    company,
    amount,
    note,
    user: req.user.id,
  });
  try {
    const newData = await data.save();
    // Ghi lịch sử
    const history = new History({
      action: "CREATE_DATA",
      content: `Created data with ID ${newData._id}`,
      user: req.user.id,
    });
    await history.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật trạng thái data (chỉ admin)
exports.updateData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });

    if (req.body.status) {
      data.status = req.body.status;
    }
    const updatedData = await data.save();
    // Ghi lịch sử
    const history = new History({
      action: "UPDATE_DATA",
      content: `Updated data with ID ${updatedData._id} to status ${updatedData.status}`,
      user: req.user.id,
    });
    await history.save();
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa data (chủ sở hữu hoặc admin)
exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });

    if (req.user.level !== "admin" && data.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await data.remove();
    // Ghi lịch sử
    const history = new History({
      action: "DELETE_DATA",
      content: `Deleted data with ID ${req.params.id}`,
      user: req.user.id,
    });
    await history.save();
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả lịch sử
exports.getAllHistory = async (req, res) => {
  try {
    const history = await History.find({}).populate("user");
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};