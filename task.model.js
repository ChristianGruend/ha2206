const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  dueDate: Date,
  status: { type: String, default: 'open', enum: ['open', 'in progress', 'done'] }
});
module.exports = mongoose.model('Task', taskSchema);
