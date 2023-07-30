async function getDataFromAPI(isbn) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => response.json())
    .then((json) => {
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
        picturePath: json.items[0].volumeInfo.imageLinks.thumbnail,
        price: 10.99,
      };
      console.log(`In function: ${bookInfo}`);
      return bookInfo;
    });
}

module.exports = getDataFromAPI;
