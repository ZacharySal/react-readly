import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  let navigate = useNavigate();

  return (
    <div className="book-overview-card" onClick={() => navigate(`/book_detail/${book.id}`)}>
      <img src={book.volumeInfo.imageLinks.thumbnail.replace("&edge=curl", "")} alt="Book Cover" />
    </div>
  );
}

export default BookCard;
