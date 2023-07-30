import apiRequest from "../apiRequest";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

function CartItem({ bookId, bookIds, setBookIds }) {
  const [bookInfo, setBookInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const getBookInfo = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const result = await response.json();
      console.log(result);
      setBookInfo(result);
      setIsLoading(false);
    };
    getBookInfo();
  }, []);

  const handleRemoveItem = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/user/cart/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.user._id, book_id: bookId }),
      },
      false
    );
    if (result.errMsg) {
      console.log(result.errMsg);
    } else {
      setBookIds(bookIds.filter((bId) => bId != bookId));
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="item-card">
          <div className="item-description">
            <img src={bookInfo.volumeInfo.imageLinks.thumbnail} />
            <div className="item-title-author">
              <h2>{bookInfo.volumeInfo.title}</h2>
              <h3>{bookInfo.volumeInfo.authors[0]}</h3>
              <h3
                style={{ color: "red", opacity: "0.8", cursor: "pointer" }}
                onClick={handleRemoveItem}
              >
                Remove Item
              </h3>
            </div>
          </div>
          <div className="price">$10</div>
        </div>
      )}
      {isLoading && <h1>Loading...</h1>}
    </>
  );
}

export default CartItem;
