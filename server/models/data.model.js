const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  itemType: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemType', required: true },
  company: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Data', dataSchema);