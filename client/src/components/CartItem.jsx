import { useNavigate } from "react-router-dom";

function CartItem({ book, handleRemoveItem }) {
  let navigate = useNavigate();

  return (
    <>
      <div className="item-card">
        <div className="item-description">
          <img
            onClick={() => navigate(`/book_detail/${book.id}`)}
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="book-cover"
          />
          <div className="item-title-author">
            <h2>{book.volumeInfo.title}</h2>
            <h3>{book.volumeInfo.authors[0]}</h3>
            <h3
              style={{ color: "red", opacity: "0.8", cursor: "pointer" }}
              onClick={() => handleRemoveItem(book)}
            >
              Remove Item
            </h3>
          </div>
        </div>
        <div className="price">$10</div>
      </div>
    </>
  );
}

export default CartItem;
