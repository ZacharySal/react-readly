import apiRequest from "../apiRequest";
import registerSchema from "../schemas/registerSchema";

import { useState } from "react";
import { useFormik } from "formik";

function Register({ setIsRegister }) {
  const [setErrorMsg] = useState("");

  let handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await apiRequest(
      `https://readly-2ed12337352a.herokuapp.com/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email.toLowerCase(),
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

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
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
    <div className="form">
      <form className="register-form" onSubmit={handleRegisterSubmit}>
        {errors.firstName && touched.firstName && <p className="form-error">{errors.firstName}</p>}
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
        <button className="form-button">Create</button>
        <p className="message" onClick={() => setIsRegister(false)}>
          Already Registered? Sign in
        </p>
      </form>
    </div>
  );
}

export default Register;
