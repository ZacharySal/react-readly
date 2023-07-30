const User = require("../models/User");
const Book = require("../models/Book");
const Order = require("../models/Order");

const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");

const addBookReadingList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user_id).exec();
  const bookExists = await User.findOne({ _id: user._id, readingList: req.body.book_id }).exec();
  if (bookExists) throw new Error("Book already exists in reading list");
  user.readingList.push(req.body.book_id);
  user.save();
  res.status(201).send();
});

const deleteBookReadingList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user_id).exec();
  user.readingList.remove(req.body.book_id);
  console.log("User reading list after deleting:" + req.body.book_id + "\n" + user.readingList);
  user.save();
  res.status(201).send();
});

const getBooksReadingList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate(["readingList"]).exec();
  console.log(req.params.id);
  console.log("Fetching user reading list...\n" + user.readingList);
  res.status(201).json(user.readingList);
});

const addBookCart = asyncHandler(async (req, res, next) => {
  console.log("recieved");
  const user = await User.findById(req.body.user_id).exec();
  const bookExists = await User.findOne({ _id: user._id, shoppingCart: req.body.book_id }).exec();
  if (bookExists) throw new Error("Book already exists in cart");
  user.shoppingCart.push(req.body.book_id);
  user.save();
  res.status(201).send();
});

const deleteBookCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user_id).exec();
  user.shoppingCart.remove({ _id: req.body.book_id });
  console.log(JSON.stringify(user.shoppingCart));
  user.save();
  res.status(201).send();
});

const getCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate(["shoppingCart"]).exec();
  res.status(201).json(user.shoppingCart);
});

const addOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user_id).exec();
  const newOrder = new Order({
    userID: req.body.user_id,
    books: req.body.books,
    date: new Date(),
    price: req.body.total_price,
  });

  await newOrder.save();
  user.orderHistory.push(newOrder);
  user.shoppingCart = [];
  user.save();
  res.status(201).send();
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user_id).exec();
  user.orderHistory.remove(req.body.order_id);
  user.save();
  console.log("order deleted");
  res.status(201).send();
});

const getOrderHistory = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate([
      {
        path: "orderHistory",
        populate: [{ path: "books" }],
      },
    ])
    .exec();
  res.status(201).json(user.orderHistory);
});

module.exports = {
  addBookReadingList,
  deleteBookReadingList,
  getBooksReadingList,
  addBookCart,
  deleteBookCart,
  getCart,
  addOrder,
  getOrderHistory,
  deleteOrder,
};
