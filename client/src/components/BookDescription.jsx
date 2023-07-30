import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import apiRequest from "../apiRequest";
import InfoMessage from "./InfoMessage";

function BookDescription({ id }) {
  const [book, setBook] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [readingListBooks, setReadingListBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  let navigate = useNavigate();

  function checkBookInReadingLists() {
    return readingListBooks.includes(book.id);
  }

  //get book info
  useEffect(() => {
    const getBookInfo = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      console.log(response);
      const result = await response.json();
      setImgSrc(result.volumeInfo.imageLinks.thumbnail);
      setBook(result);
      setIsLoading(false);
    };
    getBookInfo();
  }, []);

  //get larger cover images

  // Get books in reading list
  useEffect(() => {
    const getBooks = async () => {
      const result = await apiRequest(
        `${process.env.DB_URL}/user/reading_list/${auth.user._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        true
      );
      if (result.errMsg) {
        setErrorMsg("Error fetching reading list");
      } else {
        console.log(result.response);
        setReadingListBooks(result.response);
      }
    };
    getBooks();
  }, []);

  // Add book to reading list
  const handleAddBookReadingList = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `${process.env.DB_URL}/user/reading_list/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.user._id, book_id: book.id }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg("Error occurred adding book to reading list");
    } else {
      setInfoMsg("Book added to reading list");
    }
  };

  // Remove book from reading list
  const handleRemoveBookReadingList = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `${process.env.DB_URL}/user/reading_list/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.user._id, book_id: book.id }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg("Error occurred removing book from reading list");
    } else {
      setInfoMsg("Book removed from reading list");
    }
  };

  // Add book to cart
  const handleAddBookCart = async (e) => {
    e.preventDefault();
    console.log(`user: ${auth.user._id}`);
    console.log(`book: ${book._id}`);
    const result = await apiRequest(
      `${process.env.DB_URL}/user/cart/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.user._id, book_id: book.id }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg("Error occured adding book to cart");
    } else {
      setInfoMsg("Book added to cart");
    }
  };
  return (
    <>
      {infoMsg && <InfoMessage text={infoMsg} resetMsg={setInfoMsg} type="info" />}
      {errorMsg && <InfoMessage text={errorMsg} resetMsg={setErrorMsg} type="error" />}
      {!isLoading && (
        <div className="book-detail-container">
          <div className="book-detail-image-container">
            <div className="dot"></div>
            <img className="book-detail-image" src={imgSrc.replace("&edge=curl", "")} />
          </div>
          <div className="book-detail-description">
            <div className="book-detail-title">{book.volumeInfo.title}</div>
            <div className="book-detail-author">
              by {book.volumeInfo.authors[0]} <strong></strong>
            </div>
            <div
              className="book-detail-summary"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            ></div>
            <hr />
            <div className="book-detail-more-info">
              <strong>Release Date: </strong>
              {book.volumeInfo.publishedDate}
            </div>

            <div className="button-container">
              {/* {checkBookInReadingLists() && (
                <div className="button" onClick={handleRemoveBookReadingList}>
                  remove from reading list
                </div>
              )}

              <div className="button" onClick={handleAddBookReadingList}>
                add to reading list
              </div> */}

              {checkBookInReadingLists() ? (
                <div className="button" onClick={handleRemoveBookReadingList}>
                  remove from reading list
                </div>
              ) : (
                <div className="button" onClick={handleAddBookReadingList}>
                  add to reading list
                </div>
              )}

              <div className="button" onClick={handleAddBookCart}>
                add to cart
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookDescription;
