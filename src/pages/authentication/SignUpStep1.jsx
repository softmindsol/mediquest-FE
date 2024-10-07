import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const inputFields = [
  {
    name: "firstName",
    type: "text",
    placeholder: "Enter your first name",
    label: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Enter your last name",
    label: "Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  // {
  //   name: "phoneNumber",
  //   type: "tel",
  //   placeholder: "Enter your number",
  //   label: "Phone Number",
  // },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your new password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Re-enter your new password",
    label: "Password Confirmation",
  },
];

const SignUpStep1 = () => {
  return (
    <>
      <Header />
      <div className="w-[360px] m-auto ">
        <div className=" mt-15  pb-22  max-w-full">
          <h1 className=" text-title-xl2  text-black-3 font-semibold text-center mb-5">
            Create an account
          </h1>
          <p className="text-title-sm text-[#0D6EFD] font-bold text-center mb-6">
            1/2
          </p>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
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

                <Link
                  to="/sign-up2"
                  className="flex justify-center pt-9 w-full"
                >
                  <Button
                    text="Continue"
                    type="submit" // Ensure the button type is submit
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2  focus:outline-none w-full"
                  />
                </Link>
              </Form>
            )}
          </Formik>
          <p className="text-center text-title-p font-normal text-secondary mt-8">
            Already have an account?
            <Link to="/log-in" className="text-[#0D6EFD] underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpStep1;
