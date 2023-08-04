import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <MenuBar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
