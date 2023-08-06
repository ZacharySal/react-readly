import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Order({ order, handleRemoveOrder }) {
  function date() {
    let date = new Date(order.date);
    return date.toDateString();
  }

  return (
    <>
      <div className="order">
        <div style={{ fontSize: "0.8rem", display: "flex", flexDirection: "column" }}>
          <h2> {date()}</h2>
          <h2>${order.price.toFixed(2)}</h2>
          <h2>
            {order.books.length} {order.books.length > 1 ? "books" : "book"}
          </h2>
          <h3
            style={{ color: "red", opacity: "0.8", cursor: "pointer" }}
            onClick={handleRemoveOrder(order._id)}
          >
            Remove order
          </h3>
        </div>
        <div style={{ display: "flex", maxWidth: "50%", overflowX: "auto", gap: "0.25rem" }}>
          {order.books.map((book) => (
            <BookCover book={book} />
          ))}
        </div>
      </div>
    </>
  );
}

function BookCover({ book }) {
  let navigate = useNavigate();
  const [picturePath, setPicturePath] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${book}&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      const result = await response.json();
      setPicturePath(result.volumeInfo.imageLinks.thumbnail);
    };
    makeRequest();
  }, []);

  return (
    <div
      key={book._id}
      className="book-overview-card"
      onClick={() => navigate(`/book_detail/${book.id}`)}
    >
      <img
        style={{ boxShadow: "none" }}
        src={picturePath.replace("&edge=curl", "")}
        alt="Book Cover"
      />
    </div>
  );
}

export default Order;
