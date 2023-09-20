import useAuth from "../hooks/useAuth";
import apiRequest from "../apiRequest";
import loginSchema from "../schemas/loginSchema";
import InfoMessage from "./InfoMessage";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

function Login({ setIsRegister }) {
  const { setAuth } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let handleLoginSubmit = async (e) => {
    e.preventDefault();
    let result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: login_formik.values.email.toLowerCase(),
          password: login_formik.values.password,
        }),
      },
      true
    );
    if (result.errMsg) {
      setErrorMsg(result.errMsg);
    } else {
      const user = result.response.user;
      const token = result.response.token;
      setAuth({ user, token });
      localStorage.setItem("userData", JSON.stringify({ user, token }));
      navigate(from, { replace: true });
    }
  };

  const login_formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    handleLoginSubmit,
  });

  return (
    <>
      {errorMsg && <InfoMessage type="error" resetMsg={setErrorMsg} text={errorMsg} />}
      <div className="form">
        <div
          style={{
            textAlign: "left",
            backgroundColor: "#f2f2f2",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          <p>Demo Email: demo@gmail.com </p>
          <p>Demo Password: demo123</p>
        </div>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          {login_formik.errors.email && login_formik.touched.email && (
            <p className="form-error">{login_formik.errors.email}</p>
          )}
          <input
            type="text"
            id="email"
            value={login_formik.values.email}
            onChange={login_formik.handleChange}
            onBlur={login_formik.handleBlur}
            placeholder="Email Address"
            className={login_formik.errors.email ? "input-error" : ""}
          />

          {login_formik.errors.password && login_formik.touched.password && (
            <p className="form-error">{login_formik.errors.password}</p>
          )}
          <input
            type="password"
            id="password"
            value={login_formik.values.password}
            onChange={login_formik.handleChange}
            onBlur={login_formik.handleBlur}
            placeholder="Password"
          />
          <button className="form-button">Login</button>
          <p className="message" onClick={() => setIsRegister(true)}>
            Don't have an account? Create one here.
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
