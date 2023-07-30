import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/subject/${searchValue}`);
    }
  };

  return (
    <>
      <div className="navbar desktop-hidden">
        <div
          style={{ borderBottom: "3px solid lightcoral" }}
          onClick={() => navigate("/")}
          className="navbar-item"
        >
          Readly
        </div>

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

        <div className="navbar-item" onClick={() => navigate("/cart")}>
          View Cart
        </div>
      </div>
    </>
  );
}

export default NavBar;
