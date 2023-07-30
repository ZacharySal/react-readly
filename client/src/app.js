import HomePage from "./scenes/HomePage";
import AddBookPage from "./scenes/AddBookPage";
import BookDetailPage from "./scenes/BookDetailPage";
import CategoryPage from "./scenes/CategoryPage";
import ReadingListPage from "./scenes/ReadingListPage";
import OrderHistoryPage from "./scenes/OrderHistoryPage";
import LoginPage from "./scenes/LoginPage";
import CartPage from "./scenes/CartPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";

import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const retrievedAuth = JSON.parse(localStorage.getItem("userData"));
    if (retrievedAuth) {
      setAuth(retrievedAuth);
      setUserID(retrievedAuth.user._id);
    }
    setIsLoading(false);
  }, []);

  if (!isLoading) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage userID={userID} />} />
            <Route path="/book_detail/:id" element={<BookDetailPage />} />
            <Route path="/:type/:category" element={<CategoryPage />} />
            <Route path="/add_book" element={<AddBookPage />} />
            <Route path="/order_history" element={<OrderHistoryPage userID={userID} />} />
            <Route path="/reading_list" element={<ReadingListPage userID={userID} />} />
          </Route>
          {/* NEED TO IMPLEMENT CATCH ALL PAGE*/}
        </Route>
      </Routes>
    );
  } else {
    return <h1> Loading... </h1>;
  }
}

export default App;
