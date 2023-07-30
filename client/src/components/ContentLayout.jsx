import MenuBar from "./MenuBar";
import NavBar from "./NavBar";
import InfoMessage from "./InfoMessage";

function ContentLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="home-main">
        <MenuBar />
        {children}
      </div>
    </>
  );
}

export default ContentLayout;
