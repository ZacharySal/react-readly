const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: { type: String },
  author: { type: String },
  title: { type: String },
  publisher: { type: String },
  publishedDate: { type: String },
  description: { type: String },
  pageCount: { type: Number },
  genre: [{ type: String }],
  rating: { type: Number },
  picturePath: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Book", BookSchema);
