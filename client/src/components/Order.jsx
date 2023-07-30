import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../apiRequest";

function Order({ order, handleRemoveOrder }) {
  console.log(order);

  function date() {
    date = new Date(order.date);
    return date.toDateString();
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "rgba(250, 235, 215, 0.6)",
          alignItems: "center",
          borderRadius: "20px",
          width: "40%",
          padding: "1rem 2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1> {date()}</h1>
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
        <div style={{ display: "flex", maxWidth: "70%", overflowX: "auto" }}>
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
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${book}`);
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
      <img src={picturePath.replace("&edge=curl", "")} alt="Book Cover" />
    </div>
  );
}

export default Order;
