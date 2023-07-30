const express = require("express");
const {
  addBookReadingList,
  deleteBookReadingList,
  getBooksReadingList,
  addBookCart,
  getCart,
  deleteBookCart,
  getOrderHistory,
  addOrder,
  deleteOrder,
} = require("../controllers/userController");

const router = express.Router();

router.post("/reading_list/add", addBookReadingList);
router.post("/reading_list/remove", deleteBookReadingList);
router.get("/reading_list/:id", getBooksReadingList);

router.get("/cart/:id", getCart);
router.post("/cart/add", addBookCart);
router.post("/cart/remove", deleteBookCart);

router.get("/order_history/:id", getOrderHistory);
router.post("/order_history/add", addOrder);
router.post("/order_history/remove", deleteOrder);

module.exports = router;
