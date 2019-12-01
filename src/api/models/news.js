const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: String,
});

module.exports = mongoose.model('News', newsSchema);
