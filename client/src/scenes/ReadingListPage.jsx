import ContentLayout from "../components/ContentLayout";
import BookDisplay from "../components/BookDisplay";
import BookCard from "../components/BookCard";

import { useState, useEffect } from "react";

function ReadingListPage({ userID }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let bookIds = [];

  const skeletonBooks = [];
  for (let i = 0; i <= 10; i++) {
    skeletonBooks.push(<div className="skeleton-book-card animate-pulse"></div>);
  }

  useEffect(() => {
    const getBookInfo = async (bookId) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      const book = await response.json();
      return book;
    };

    const getBookIds = async () => {
      const response = await fetch(
        `https://readly-2ed12337352a.herokuapp.com/user/reading_list/${userID}`
      );
      const resJson = await response.json();
      bookIds = resJson;

      const books = await Promise.all(bookIds.map(async (bookId) => getBookInfo(bookId)));
      setBooks(books);
      setIsLoading(false);
    };

    getBookIds();
  }, []);

  return (
    <ContentLayout>
      <BookDisplay>
        <>
          <h1>Your Reading List</h1>
          <div className="book-genre">
            {isLoading && skeletonBooks}
            {!isLoading &&
              books.map((book, i) => {
                if (JSON.stringify(book).includes("thumbnail")) {
                  return <BookCard key={i} book={book} />;
                }
              })}
          </div>
        </>
      </BookDisplay>
    </ContentLayout>
  );
}

export default ReadingListPage;
