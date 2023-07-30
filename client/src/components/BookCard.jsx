import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BookCard({ book }) {
  let navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");

  return (
    <div className="book-overview-card" onClick={() => navigate(`/book_detail/${book.id}`)}>
      <img src={book.volumeInfo.imageLinks.thumbnail.replace("&edge=curl", "")} alt="Book Cover" />
      {/* {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>} */}
    </div>
  );
}

export default BookCard;
