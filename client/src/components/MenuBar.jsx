import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function MenuBar() {
  let navigate = useNavigate();
  const genres = ["Mystery", "Fantasy", "Love", "Childrens"];
  const authors = ["Stephen King", "George R. R. Martin", "James Patterson"];
  const { setAuth } = useAuth();

  function handleLogout() {
    setAuth("");
    localStorage.clear("userData");
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">Genres</div>
      {genres.map((genre) => {
        return (
          <div className="sidebar-item" key={genre} onClick={() => navigate(`/subject/${genre}`)}>
            {genre}
          </div>
        );
      })}
      <hr />
      <div className="sidebar-header">Authors</div>
      {authors.map((author, index) => {
        return (
          <div className="sidebar-item" key={author} onClick={() => navigate(`/author/${author}`)}>
            {author}
          </div>
        );
      })}
      <hr />
      <div className="sidebar-header">Profile</div>
      <div className="sidebar-item" onClick={() => navigate("/order_history")}>
        Order History
      </div>
      <div className="sidebar-item" onClick={() => navigate("/reading_list")}>
        Reading List
      </div>
      <div className="sidebar-item" onClick={handleLogout}>
        Logout
      </div>
      <hr />
      <div className="sidebar-header">System</div>
      <div
        onClick={() => {
          navigate("/add_book");
        }}
        className="sidebar-item"
      >
        Add Book
      </div>
    </div>
  );
}

export default MenuBar;
