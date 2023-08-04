import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showGenres, setShowGenres] = useState(true);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const { auth, setAuth } = useAuth();

  let navigate = useNavigate();

  const genres = ["Nonfiction", "Fiction", "True Crime", "Juvenile Fiction"];
  const authors = ["Stephen King", "George R. R. Martin", "James Patterson"];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/subject/${searchValue}`);
    }
  };

  function handleLogout() {
    setAuth("");
    localStorage.clear("userData");
  }

  return (
    <>
      {showMenu && (
        <div className="side-menu">
          <i onClick={() => setShowMenu(false)} className="fa-solid fa-xmark"></i>
          <ul>
            <li
              onClick={() => {
                setShowGenres(!showGenres);
              }}
            >
              Genres
              {showGenres && (
                <ul>
                  {genres.map((genre) => {
                    return (
                      <li
                        key={genre}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          navigate(`/subject/${genre}`);
                        }}
                      >
                        {genre}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            <li onClick={() => setShowAuthors(!showAuthors)}>
              Authors
              {showAuthors && (
                <ul>
                  {authors.map((author) => {
                    return (
                      <li
                        key={author}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          navigate(`/author/${author}`);
                        }}
                      >
                        {author}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
            <li onClick={() => setShowProfile(!showProfile)}>
              Profile
              {showProfile && (
                <ul>
                  <li
                    key={"order_history"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      navigate("/order_history");
                    }}
                  >
                    Order History
                  </li>
                  <li
                    key={"reading_list"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      navigate("/reading_list");
                    }}
                  >
                    Reading List
                  </li>
                  {auth.user && (
                    <li
                      key={"logout"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </li>
                  )}
                  {!auth.user && (
                    <li
                      key={"login"}
                      onClick={() => {
                        setShowMenu(false);
                        navigate("/login");
                      }}
                    >
                      Login
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}

      <div className="navbar">
        <div className="navbar-item desktop-hidden">
          <i onClick={() => setShowMenu(true)} className="fa-solid fa-bars"></i>
        </div>

        <div
          style={{ borderBottom: "3px solid lightcoral" }}
          onClick={() => navigate("/")}
          className="navbar-item"
        >
          Readly
        </div>

        <div className="search-container mobile-hidden">
          <div className="search-box">
            <div className="search-field">
              <input
                type="text"
                className="input"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search books by name, author, genre"
                value={searchValue}
                onKeyDown={handleKeyDown}
              />
              <i className="fas fa-search" onClick={() => navigate(`/subject/${searchValue}`)}></i>
            </div>
          </div>
        </div>

        <div className="navbar-item desktop-hidden" onClick={() => navigate("/cart")}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>

        <div className="navbar-item mobile-hidden" onClick={() => navigate("/cart")}>
          View Cart
        </div>
      </div>

      <div className="navbar desktop-hidden">
        <div className="search-container">
          <div className="search-box">
            <div className="search-field">
              <input
                type="text"
                className="input"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search books by name, author, genre"
                value={searchValue}
                onKeyDown={handleKeyDown}
              />
              <i className="fas fa-search" onClick={() => navigate(`/subject/${searchValue}`)}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
