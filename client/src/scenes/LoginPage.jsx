import Login from "../components/Login";
import Register from "../components/Register";

import { useState } from "react";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "10rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontFamily: "Playfair Display, serif" }}>
          Welcome to <span style={{ color: "lightcoral" }}>Readly</span>! A place to view and
          explore every book imaginable!
        </h1>
        {isRegister && <Register setIsRegister={setIsRegister} />}
        {!isRegister && <Login setIsRegister={setIsRegister} />}
      </div>
    </>
  );
}

export default LoginPage;
