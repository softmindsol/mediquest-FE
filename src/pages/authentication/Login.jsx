import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

const Login = () => {
  return (
    <>
      <Header />
      <div className="w-[360px] m-auto ">
        <div className=" mt-30 mb-60 pb-22  max-w-full">
          <h1 className=" text-title-xl2  text-black-3 font-semibold text-center mb-5">
            Log in to your account
          </h1>
          <p className="text-title-p text-secondary text-center mb-6">
            Welcome back! Please enter your details.
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("Form Submitted Values:", values); // Log form values here
            }}
          >
            {() => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-title-p block font-normal text-black-3"
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
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-9 w-full">
                  <Button
                    text="Sign in"
                    type="submit" // Ensure the button type is submit
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2  focus:outline-none w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-center text-title-p font-normal text-secondary mt-8">
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
