import BookCard from "./BookCard";
import { useState, useEffect } from "react";

// We need to get the books from the book source (author or genre) and display them as book cards

function BookSection({ category }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(41);

  console.log(books);

  useEffect(() => {
    const getBooksInCategory = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=40&startIndex=0`
      );
      const result = await response.json();
      setBooks((books) => result.items);
      setIsLoading(false);
    };
    getBooksInCategory();
  }, []);

  const getAdditionalBooks = async () => {
    console.log(startIndex);
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=40&startIndex=${startIndex}`
    );
    const result = await response.json();
    const newBooks = result.items;
    setBooks((books) => [...books, ...newBooks]);
    setStartIndex((index) => startIndex + 41);
  };

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <>
          <h1> Explore {category} Books</h1>
          <div className="book-genre">
            {books.map((book, i) => {
              if (JSON.stringify(book).includes("thumbnail")) {
                return <BookCard key={i} book={book} />;
              }
            })}
          </div>
          <div
            className="button"
            style={{
              width: "40%",
              margin: "2rem auto",
            }}
            onClick={() => getAdditionalBooks()}
          >
            Show more
          </div>{" "}
        </>
      )}
    </>
  );
}

export default BookSection;
