import ContentLayout from "../components/ContentLayout";
import BookDisplay from "../components/BookDisplay";
import BookCard from "../components/BookCard";
import BookSection from "../components/BookSection";
import apiRequest from "../apiRequest";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

function ReadingListPage({ userID }) {
  //const [errMsg, setErrorMsg] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let bookIds = [];

  useEffect(() => {
    const getBookInfo = async (bookId) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const book = await response.json();
      return book;
    };

    const getBookIds = async () => {
      const response = await fetch(
        `https://readly-6c4c3a8d382b.herokuapp.com/user/reading_list/${userID}`
      );
      const resJson = await response.json();
      bookIds = resJson;

      const books = await Promise.all(bookIds.map(async (bookId) => getBookInfo(bookId)));
      setBooks(books);
      console.log(books);
      setIsLoading(false);
    };

    getBookIds();
  }, []);

  return (
    <ContentLayout>
      <BookDisplay>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && (
          <>
            <h1>Your Reading List</h1>
            <div className="book-genre">
              {books.map((book, i) => {
                if (JSON.stringify(book).includes("thumbnail")) {
                  return <BookCard key={i} book={book} />;
                }
              })}
            </div>
          </>
        )}
      </BookDisplay>
    </ContentLayout>
  );
}

export default ReadingListPage;
