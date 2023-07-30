import BookDisplay from "../components/BookDisplay";
import BookSection from "../components/BookSection";
import ContentLayout from "../components/ContentLayout";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import apiRequest from "../apiRequest";
import InfoMessage from "../components/InfoMessage";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("exploring mystery books");

  useEffect(() => {
    const getBooksInCategory = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:mystery&maxResults=40&startIndex=0`
      );
      const result = await response.json();
      setBooks(result.items);
      setIsLoading(false);
    };
    getBooksInCategory();
  }, []);

  // useEffect(() => {
  //   const getBooks = async () => {
  //     const result = await apiRequest(
  //       `https://readly-6c4c3a8d382b.herokuapp.com/catalog/books`,
  //       {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       },
  //       true
  //     );
  //     if (result.errMsg) {
  //       setErrorMsg(result.errMsg);
  //     } else {
  //       setBooks(result.response);
  //     }
  //   };
  //   getBooks();
  // }, []);

  // const fictionBooks = books.filter((book) => book.genre[0] === "Fiction");
  // const biographyBooks = books.filter((book) => book.genre[0] === "Biography & Autobiography");
  // const mysteryBooks = books.filter((book) => book.genre[0] === "Detective and mystery stories");
  // const artBooks = books.filter((book) => book.genre[0] === "Art");

  return (
    <ContentLayout>
      {errorMsg && <InfoMessage text={errorMsg} type={"error"} />}
      <BookDisplay>
        {!isLoading && <BookSection category={"Detective"} />}
        {isLoading && <h1>Loading...</h1>}
      </BookDisplay>
    </ContentLayout>
  );
}

export default HomePage;
