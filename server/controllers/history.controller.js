const History = require('../models/history.model');

// Lấy tất cả history (chỉ admin)
exports.getAllHistory = async (req, res) => {
  try {
    const history = await History.find().populate('user');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};