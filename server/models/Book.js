const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pubYear: { type: String },
  description: { type: String },
  userId: { type: mongoose.Schema.ObjectId }
});

module.exports = mongoose.model('Book', schema);
