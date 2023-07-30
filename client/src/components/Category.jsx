import BookCard from "./BookCard";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Category() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.DB_URL}/catalog/${category}/books`)
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  if (isLoading) return <h1>Loading...</h1>;
  else
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          margin: "2rem",
        }}
      >
        <div className="header-text">Stress Less. Read More.</div>
        <h1> Explore {category} Books </h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {books.map((book) => {
            return (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                price={book.price}
                picturePath={book.picturePath}
                id={book._id}
              />
            );
          })}
        </div>
      </div>
    );
}

export default Category;
