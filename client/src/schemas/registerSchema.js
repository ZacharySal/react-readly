import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Too many characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(3, "Must be at least 3 letters")
    .max(15, "Too many characters")
    .required("Last Name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(5, "Must be at least 5 characters").required("Password is required"),
});

export default registerSchema;
