import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import apiRequest from "../apiRequest";
import ContentLayout from "../components/ContentLayout";
import CartItem from "../components/CartItem";
import InfoMessage from "../components/InfoMessage";

function CartPage({ userID }) {
  const [bookIds, setBookIds] = useState([]);
  const [books, setBooks] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  const { auth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      window.location.reload(false);
    }

    const getBookInfo = async (bookId) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      const book = await response.json();
      return book;
    };

    const getBookIds = async () => {
      const result = await apiRequest(
        `https://readly-2ed12337352a.herokuapp.com/user/cart/${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        true
      );
      if (result.errMsg) {
        setErrorMsg("Error fetching cart data");
      } else {
        const bookIdsTemp = result.response;
        const books = await Promise.all(bookIdsTemp.map(async (bookId) => getBookInfo(bookId)));
        setBooks(books);
        setBookIds(bookIdsTemp);
        setIsLoading(false);
      }
    };

    getBookIds();
  }, [userID]);

  const handleConfirmOrder = async () => {
    const result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/user/order_history/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          books: bookIds,
          total_price: (books.length * 10).toFixed(2),
        }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg("Error confirming order");
    } else {
      setBookIds([]);
      setOrderComplete(true);
    }
  };

  const handleRemoveItem = async (book) => {
    const result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/user/cart/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: auth.user._id, book_id: book.id }),
      },
      false
    );
    if (result.errMsg) {
    } else {
      setBookIds(bookIds.filter((bId) => bId !== book.id));
      setBooks(books.filter((b) => b.id !== book.id));
    }
  };

  if (!orderComplete) {
    return (
      <>
        {errMsg && <InfoMessage type="error" resetMsg={setErrorMsg} text={errMsg} />}
        <ContentLayout>
          <div className="shopping-cart-page">
            {books.length > 0 && (
              <>
                <div className="shopping-cart">
                  <div className="sub-headers">
                    <h2>Product Details</h2>
                    <h2>Price</h2>
                  </div>
                  {!isLoading &&
                    books.map((book) => (
                      <CartItem key={book.id} book={book} handleRemoveItem={handleRemoveItem} />
                    ))}
                  {isLoading && (
                    <>
                      <div className="skeleton-item-card animate-pulse"></div>
                      <div className="skeleton-item-card animate-pulse"></div>
                    </>
                  )}
                </div>

                <div className="shopping-cart-cta">
                  {!isLoading && (
                    <>
                      <div className="button" style={{ flexGrow: 0 }} onClick={handleConfirmOrder}>
                        Confirm Order
                      </div>
                      <h1>Total: ${(books.length * 10).toFixed(2)}</h1>
                    </>
                  )}
                  {isLoading && (
                    <>
                      <div className="skeleton-button animate-pulse" />
                      <div className="skeleton-text animate-pulse"></div>
                    </>
                  )}
                </div>
              </>
            )}
            {books.length === 0 && (
              <h1 style={{ textAlign: "center", marginTop: "4rem" }}> Your cart is empty </h1>
            )}
          </div>
        </ContentLayout>
      </>
    );
  } else if (!isLoading && orderComplete) {
    return (
      <ContentLayout>
        <div className="order-complete">
          <i class="fa-solid fa-circle-check"></i>
          <h1>Your order has been confirmed!</h1>
          <h2
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/order_history")}
          >
            View order history
          </h2>
        </div>
      </ContentLayout>
    );
  }
}

export default CartPage;
