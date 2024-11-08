import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { LoginSchema } from "../../schema/auth.schema";
import { loginUser } from "../../store/features/auth/auth.service";

const inputFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
];
const encryptPassword = (password) => {
  try {
    return btoa(password);
  } catch (error) {
    console.error("Encoding error:", error);
    throw error;
  }
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="w-[360px] m-auto ">
        <div className="max-w-full mt-30 mb-60 pb-22">
          <h1 className="mb-5 font-semibold text-center text-title-xl2 text-black-3">
            Log in to your account
          </h1>
          <p className="mb-6 text-center text-title-p text-secondary">
            Welcome back! Please enter your details.
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              try {
                // Encrypt the password before sending it to the backend
                const encodedPassword = encryptPassword(values.password);

                const response = await dispatch(
                  loginUser({
                    email: values.email,
                    password: encodedPassword,
                    rememberMe: values.rememberMe,
                  })
                );

                if (response.type === "loginUser/fulfilled") {
                  navigate("/");

                  resetForm();
                }
              } catch (error) {
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1 ">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block font-normal text-title-p text-black-3"
                      >
                        {field?.label}
                      </label>
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-3 p-3  text-secondary text-title-p focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between py-2 ">
                  <div className="flex items-center">
                    <input
                      onChange={(e) =>
                        setFieldValue("rememberMe", e.target.checked)
                      }
                      type="checkbox"
                      className="mr-3  w-[16px] h-[16px]"
                      name="rememberMe"
                    />
                    <span className="text-[16px] text-[#212529]">
                      Remember me
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="text-[#0D6EFD] text-title-p  underline"
                  >
                    Forgot password
                  </Link>
                </div>

                <div className="flex items-center justify-center w-full ">
                  <Button
                    disabled={isSubmitting}
                    text="Sign in"
                    type="submit"
                    className="bg-[#0D6EFD] text-title-p mx-auto item-center rounded-[4px] border text-white font-normal py-2  focus:outline-none w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-8 font-normal text-center text-title-p text-secondary">
            Don’t have an account?
            <Link to="/sign-up" className="text-[#0D6EFD] underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
