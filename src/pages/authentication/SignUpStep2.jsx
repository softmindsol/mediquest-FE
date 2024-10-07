import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterTwoSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiChevronLeft } from "react-icons/fi";

// Updated input fields with city as a select input
const inputFields = [
  {
    name: "year",
    type: "tel",
    placeholder: "Enter your Year",
    label: "Year ",
  },
  {
    name: "city",
    type: "select",
    label: "City",
  },
  {
    name: "university",
    type: "email",
    placeholder: "Enter your University",
    label: "University",
  },
  {
    name: "phoneNumber",
    type: "tel",
    placeholder: "Enter your number",
    label: "Phone Number",
  },
];

// List of cities for the select input
const cities = [
  "Rabat",
  "Casablanca",
  "Tanger",
  "Marrakech",
  "Agadir",

];

const SignUpStep2 = () => {
  return (
    <>
      <Header />
      <div className="flex justify-evenly items-center mt-15 mb-10 max-w-full">
        <Link to="/sign-up" className="flex justify-center items-center ">
          <Button
            text="Prev"
            type="button"
            iconPosition="left"
            className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100 focus:outline-none"
          />
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="text-title-xl2 text-black font-semibold text-center mb-1">
            Create an account
          </h1>
          <p className="text-title-sm text-[#0D6EFD] font-bold text-center">
            2/2
          </p>
        </div>
        <div className="w-[72px]"></div>
      </div>

      <div className="w-[360px] m-auto ">
        <div className="mb-60 pb-22 max-w-full">
          <Formik
            initialValues={{
              year: "",
              city: "",
              university: "",
              phoneNumber: "",
            }}
            validationSchema={RegisterTwoSchema}
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
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <Field
                          as="select"
                          id={field.name}
                          name={field.name}
                          className="mt-3 p-3 text-secondary text-title-p bg-white focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                        >
                          <option value="" label="Select your city" />
                          {cities.map((city) => (
                            <option key={city} value={city} label={city} />
                          ))}
                        </Field>
                      ) : (
                        <Field
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="mt-3 p-3 text-secondary text-title-p focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                        />
                      )}
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
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2 focus:outline-none w-full"
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

export default SignUpStep2;
