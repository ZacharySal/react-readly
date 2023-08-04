import { useState, useEffect } from "react";
import apiRequest from "../apiRequest";
import Order from "../components/Order";
import ContentLayout from "../components/ContentLayout";
import InfoMessage from "../components/InfoMessage";

function OrderHistoryPage({ userID }) {
  const [orders, setOrders] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userID) {
      window.location.reload(false);
    }
    const makeRequest = async () => {
      const result = await apiRequest(
        `https://readly-2ed12337352a.herokuapp.com/user/order_history/${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        true
      );
      if (result.errMsg) {
        setErrorMsg("Error fetching cart data");
      } else {
        setIsLoading(false);
        setOrders(result.response);
      }
    };
    makeRequest();
  }, []);

  const handleRemoveOrder = (order_id) => async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/user/order_history/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, order_id: order_id }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg("Error deleting order");
    } else {
      setOrders(orders.filter((o) => o._id != order_id));
      setInfoMsg("Successfully deleted order");
    }
  };

  return (
    <>
      {errMsg && <InfoMessage type="error" resetMsg={setErrorMsg} text={errMsg} />}
      {infoMsg && <InfoMessage type="info" resetMsg={setInfoMsg} text={infoMsg} />}
      <ContentLayout>
        <div className="order-history-page">
          {!isLoading &&
            orders.map((order) => (
              <Order order={order} key={order._id} handleRemoveOrder={handleRemoveOrder} />
            ))}
          {isLoading && (
            <>
              <div className="skeleton-order" />
              <div className="skeleton-order" />
            </>
          )}
        </div>
      </ContentLayout>
    </>
  );
}

export default OrderHistoryPage;
