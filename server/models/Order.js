const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
  books: [{ type: String }],
  date: { type: Date },
  price: { type: Number },
});

module.exports = mongoose.model("Order", OrderSchema);
