import useAuth from "../hooks/useAuth";
import apiRequest from "../apiRequest";
import registerSchema from "../schemas/registerSchema";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

function Register({ setIsRegister }) {
  const { setAuth } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `${process.env.DB_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      },
      false
    );
    if (result.errMsg) {
      setErrorMsg(result.errMsg);
    } else {
      setIsRegister(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchema,
      handleRegisterSubmit,
    });

  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form" onSubmit={handleRegisterSubmit}>
          {errors.firstName && touched.firstName && (
            <p className="form-error">{errors.firstName}</p>
          )}
          <input
            type="text"
            id="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First Name"
          />
          {errors.lastName && touched.lastName && <p className="form-error">{errors.lastName}</p>}
          <input
            type="text"
            id="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Last Name"
          />
          {errors.email && touched.email && <p className="form-error">{errors.email}</p>}
          <input
            type="text"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email Address"
          />
          {errors.password && touched.password && <p className="form-error">{errors.password}</p>}
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
          <button className="button">create</button>
          <p className="message">
            <button className="button" onClick={() => setIsRegister(false)}>
              Already Registered? Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
