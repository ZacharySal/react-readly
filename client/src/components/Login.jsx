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
      "https://readly-6c4c3a8d382b.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: login_formik.values.email,
          password: login_formik.values.password,
        }),
      },
      true
    );
    if (result.errMsg) {
      console.log(errorMsg);
      setErrorMsg(result.errMsg);
    } else {
      console.log(result.response);
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
      <div className="login-page">
        <div className="form">
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
            <button className="button">login</button>
            <p className="message">
              <button className="button" onClick={() => setIsRegister(true)}>
                Not registered? Create an account
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
