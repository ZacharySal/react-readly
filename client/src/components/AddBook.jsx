import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../apiRequest";

function AddBook() {
  const [isbn, setIsbn] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `${process.env.DB_URL}/catalog/create/book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn: isbn }),
      },
      true
    );
    if (result.errMsg) setErrorMsg(result.errMsg);
    else navigate(`/book_detail/${result.response}`);
  };

  return (
    <form style={{ margin: "10rem auto" }} className="add-book" onSubmit={handleSubmit}>
      <label style={{ fontSize: "2rem" }} htmlFor="isbn">
        Enter ISBN:
      </label>
      <input
        style={{ height: "2rem", margin: "1.5rem", borderRadius: "5%" }}
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <input style={{ height: "3rem" }} type="submit" value="Submit" />
    </form>
  );
}

export default AddBook;
