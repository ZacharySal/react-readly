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
