import Login from "../components/Login";
import Register from "../components/Register";

import { useState } from "react";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <div className="login-page">
        <div className="login-text">
          Welcome to <span style={{ color: "lightcoral" }}>Readly</span>, a place to view and explore every book
          imaginable
        </div>
        {isRegister && <Register setIsRegister={setIsRegister} />}
        {!isRegister && <Login setIsRegister={setIsRegister} />}
      </div>
    </>
  );
}

export default LoginPage;
