const data = require("./sampleData");
const Book = require("./models/Book");

const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://zachsalvaggio:wadfKWANHMUvOUb3@cluster0.lkev9xi.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB...");
}

let newData = data.filter((d) => !d.isbn.includes("-"));
newData = newData.filter((d) => !(d.isbn === " "));

getAllData().catch((err) => console.log(err));
async function getAllData() {
  await Promise.all(
    newData.map(async (data) => {
      await getDataFromAPI(data.isbn.replace(": ", ""));
    })
  );
  console.log("Finsihed");
}

async function getDataFromAPI(isbn) {
  console.log(`Getting data for ${isbn}`);
  const isbnExists = await Book.find({ isbn: isbn }).exec();
  if (isbnExists.length) {
    console.log("Book already exists in database");
    return;
  }
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const json = await response.json();

  if (json.totalItems === 0) {
    console.log("Not found in database.");
    return;
  }

  // give placeholder picture if none exists
  if (!JSON.stringify(json.items[0]).includes("thumbnail")) {
    console.log("No thumbnail found. Not adding.");
    return;
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
  return;
}
