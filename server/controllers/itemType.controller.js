const ItemType = require('../models/itemType.model');
const History = require('../models/history.model');

// Lấy tất cả item types
exports.getAllItemTypes = async (req, res) => {
  try {
    const itemTypes = await ItemType.find().populate('user');
    res.json(itemTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo item type mới (chỉ admin)
exports.createItemType = async (req, res) => {
  const { name } = req.body;
  const itemType = new ItemType({
    name,
    user: req.user.id,
  });
  try {
    const newItemType = await itemType.save();
    // Ghi lịch sử
    const history = new History({
      action: 'CREATE_ITEM_TYPE',
      content: `Created item type with ID ${newItemType._id}`,
      user: req.user.id,
    });
    await history.save();
    res.status(201).json(newItemType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật item type (chỉ admin)
exports.updateItemType = async (req, res) => {
  try {
    const itemType = await ItemType.findById(req.params.id);
    if (!itemType) return res.status(404).json({ message: 'ItemType not found' });

    if (req.body.name) {
      itemType.name = req.body.name;
    }
    const updatedItemType = await itemType.save();
    // Ghi lịch sử
    const history = new History({
      action: 'UPDATE_ITEM_TYPE',
      content: `Updated item type with ID ${updatedItemType._id}`,
      user: req.user.id,
    });
    await history.save();
    res.json(updatedItemType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa item type (chỉ admin)
exports.deleteItemType = async (req, res) => {
  try {
    const itemType = await ItemType.findById(req.params.id);
    if (!itemType) return res.status(404).json({ message: 'ItemType not found' });

    await itemType.remove();
    // Ghi lịch sử
    const history = new History({
      action: 'DELETE_ITEM_TYPE',
      content: `Deleted item type with ID ${req.params.id}`,
      user: req.user.id,
    });
    await history.save();
    res.json({ message: 'ItemType deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};