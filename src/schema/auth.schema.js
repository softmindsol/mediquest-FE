import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  firstName: Yup.string().required("First Name Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(/[@$!%*?&#]/, "Password must have at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
 
});
export const RegisterTwoSchema = Yup.object({
  year: Yup.string().required("year is required"),
  city: Yup.string().required("city is required"),
  university: Yup.string().required("university is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone Number can only contain digits")
    .required("Phone Number is required"),
});

export const NewRegisterSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(/[@$!%*?&#]/, "Password must have at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"), // Add this line
});


