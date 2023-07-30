const express = require("express");

const {
  getAllGenresAndAuthors,
  getAllBooksInCategory,
  createNewBook,
  getBookInfo,
  deleteBook,
  getAllBooks,
} = require("../controllers/catalogController");

const router = express.Router();

/* CREATE */
router.post("/create/book", createNewBook);
router.post("/delete/book", deleteBook);

/* READ */
router.get("/all/genres&authors", getAllGenresAndAuthors);
router.get("/:category/books", getAllBooksInCategory);
router.get("/books", getAllBooks);
router.get("/info/book/:id", getBookInfo);

module.exports = router;
