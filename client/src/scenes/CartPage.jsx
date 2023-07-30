import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../apiRequest";
import ContentLayout from "../components/ContentLayout";
import CartItem from "../components/CartItem";
import InfoMessage from "../components/InfoMessage";

function CartPage({ userID }) {
  const [bookIds, setBookIds] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  let navigate = useNavigate();
  let totalPrice = 0;

  useEffect(() => {
    const makeRequest = async () => {
      const result = await apiRequest(
        `https://readly-6c4c3a8d382b.herokuapp.com/user/cart/${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        true
      );
      if (result.errMsg) {
        setErrorMsg("Error fetching cart data");
      } else {
        setBookIds(result.response);
        setIsLoading(false);
      }
    };
    makeRequest();
  }, []);

  const handleConfirmOrder = async () => {
    const result = await apiRequest(
      "https://readly-6c4c3a8d382b.herokuapp.com/user/order_history/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          books: bookIds,
          total_price: totalPrice.toFixed(2),
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
  if (!isLoading && !orderComplete) {
    return (
      <>
        {errMsg && <InfoMessage type="error" resetMsg={setErrorMsg} text={errMsg} />}
        <ContentLayout>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              margin: "4rem auto 0rem auto",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {bookIds.length > 0 && (
              <>
                <div className="shopping-cart">
                  <div className="sub-headers">
                    <h2>Product Details</h2>
                    <h2>Price</h2>
                  </div>

                  {bookIds.map(
                    (bookId, i) => (
                      (totalPrice += 10),
                      (
                        <CartItem
                          key={i}
                          bookId={bookId}
                          bookIds={bookIds}
                          setBookIds={setBookIds}
                        />
                      )
                    )
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: "2rem",
                    width: "60%",
                  }}
                >
                  <div className="button" onClick={handleConfirmOrder}>
                    Confirm Order
                  </div>
                  <h1>Total: ${totalPrice.toFixed(2)}</h1>
                </div>
              </>
            )}
            {bookIds.length === 0 && <h1> Add some books to view them here! </h1>}
          </div>
        </ContentLayout>
      </>
    );
  } else if (!isLoading && orderComplete) {
    return (
      <ContentLayout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "80%",
            margin: "15rem auto 0rem auto",
            justifyContent: "center",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <i style={{ fontSize: "15rem", color: "green" }} class="fa-solid fa-circle-check"></i>
          <h1>Your order has been confirmed! Don't expect a delivery!</h1>
          <h2
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/order_history")}
          >
            {" "}
            View order history{" "}
          </h2>
        </div>
      </ContentLayout>
    );
  } else {
    return (
      <ContentLayout>
        <h1>Loading...</h1>
      </ContentLayout>
    );
  }
}

export default CartPage;
