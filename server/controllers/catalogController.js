const Book = require("../models/Book");

const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");

const createNewBook = asyncHandler(async (req, res, next) => {
  console.log(req.body.isbn);
  const isbn = req.body.isbn;
  const isbnExists = await Book.find({ isbn: isbn }).exec();
  if (isbnExists.length) throw new Error("Book already exists in datbase");
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const json = await response.json();
  if (json.totalItems === 0) throw new Error("Book not found in database");

  // give placeholder picture if none exists
  if (!JSON.stringify(json.items[0]).includes("thumbnail")) {
    throw new Error("No picture found, will not add.");
  }

  const bookInfo = {
    isbn: isbn,
    author: json.items[0].volumeInfo.authors[0],
    title: json.items[0].volumeInfo.title,
    publisher: json.items[0].volumeInfo.publisher,
    publishedDate: json.items[0].volumeInfo.publishedDate,
    description: json.items[0].volumeInfo.description,
    pageCount: json.items[0].volumeInfo.pageCount,
    genre: json.items[0].volumeInfo.categories[0],
    rating: json.items[0].volumeInfo.averageRating,
    picturePath: json.items[0].volumeInfo.imageLinks.thumbnail.replace("&edge=curl", ""),
    price: Math.floor(Math.random() * 25) + 0.99,
  };

  const book = new Book(bookInfo);
  await book.save();
  console.log(`Added new book! Title: ${bookInfo.title} Author: ${bookInfo.author}`);
  res.status(201).json(book._id);
});

/* READ */
const getBookInfo = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).exec();
  const genres = await Book.find().distinct("genre").exec();
  console.log(genres);
  res.status(201).json(book);
});

const getAllGenresAndAuthors = asyncHandler(async (req, res, next) => {
  const genres = await Book.find().distinct("genre").exec();
  const authors = await Book.find().distinct("author").exec();
  res.send([genres, authors]);
});

const getAllGenres = asyncHandler(async (req, res, next) => {
  const genres = await Book.find().distinct("genre").exec();
  res.send(genres);
});

const getAllAuthors = asyncHandler(async (req, res, next) => {
  const authors = await Book.find().distinct("author").exec();
  res.send(authors);
});

const getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({});
  res.send(books);
});

const getAllBooksInCategory = asyncHandler(async (req, res, next) => {
  const authorBooks = await Book.find({ author: req.params.category }).exec();
  if (authorBooks.length > 0) {
    res.send(authorBooks);
  } else {
    const genreBooks = await Book.find({ genre: req.params.category }).exec();
    res.send(genreBooks);
  }
});

/* DELETE */
const deleteBook = asyncHandler(async (req, res, next) => {
  console.log(req.body.id);
  await Book.findByIdAndDelete(req.body.id).exec();
  res.status(201).send();
});

module.exports = {
  getBookInfo,
  getAllGenresAndAuthors,
  getAllGenres,
  getAllAuthors,
  getAllBooks,
  getAllBooksInCategory,
  createNewBook,
  deleteBook,
};
