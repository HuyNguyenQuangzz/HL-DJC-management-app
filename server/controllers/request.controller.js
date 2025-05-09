const Request = require("../models/request.model");

// Lấy tất cả requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo request mới
exports.createRequest = async (req, res) => {
  const request = new Request({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật trạng thái request
exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (req.body.status) {
      request.status = req.body.status;
    }
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa request
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.remove();
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
