import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function MenuBar() {
  let navigate = useNavigate();

  const genres = ["Nonfiction", "Fiction", "True Crime", "Juvenile Fiction"];
  const authors = ["Stephen King", "George R. R. Martin", "James Patterson"];

  const { auth, setAuth } = useAuth();

  function handleLogout() {
    setAuth("");
    localStorage.clear("userData");
  }

  return (
    <div className="sidebar mobile-hidden">
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
      {auth.user && (
        <div className="sidebar-item" onClick={handleLogout}>
          Logout
        </div>
      )}
      {!auth.user && (
        <div className="sidebar-item" onClick={() => navigate("/reading_list")}>
          Login
        </div>
      )}

      <hr />
    </div>
  );
}

export default MenuBar;
