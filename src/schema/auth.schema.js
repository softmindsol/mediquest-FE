import * as Yup from "yup";

// Phone number regex
const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

// Register Schema with password and confirmPassword validation
export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, and hyphens"
    ),

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Invalid email format"
    )
    .email("Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, a special character, and a number"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  year: Yup.string().required("Year is required"),

  city: Yup.string().required("City is required"),

  university: Yup.string().required("University is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Phone number is not valid"),
});

// Register Two Schema (for simplified registration steps)
export const RegisterTwoSchema = Yup.object({
  year: Yup.string().required("Year is required"),
  city: Yup.string().required("City is required"),
  university: Yup.string().required("University is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain digits")
    .required("Phone number is required"),
});

// New Register Schema (for password change functionality)
export const NewRegisterSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(/[@$!%*?&#]/, "Password must have at least one special character"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

// Login Schema
export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});
