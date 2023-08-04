import BookCard from "./BookCard";
import { useState, useEffect } from "react";

function BookSection({ category }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(41);

  const skeletonBooks = [];
  for (let i = 0; i <= 40; i++) {
    skeletonBooks.push(<div className="skeleton-book-card animate-pulse"></div>);
  }

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
      <h1 className="book-genre-header"> Explore {category} Books</h1>
      {isLoading && <div className="book-genre">{skeletonBooks}</div>}
      {!isLoading && (
        <>
          <div className="book-genre">
            {books.map((book) => {
              if (JSON.stringify(book).includes("thumbnail")) {
                return <BookCard key={book.id} book={book} />;
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
