import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { RegisterSchema } from "../../schema/auth.schema";
import { registerUser } from "../../store/features/auth/auth.service";
import { FaArrowLeft, FaAsterisk, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const inputFieldsStep1 = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
  },

  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter your number",
    label: "Phone Number",
  },
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

const inputFieldsStep2 = [
  {
    name: "year",
    type: "tel",
    placeholder: "Enter your Year",
    label: "Year",
  },
  {
    name: "city",
    type: "select",
    label: "City",
  },
  {
    name: "university",
    type: "text",
    placeholder: "Enter your University",
    label: "University",
  },
];

const cities = ["Rabat", "Casablanca", "Tanger", "Marrakech", "Agadir"];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  console.log(user);
  console.log(user?.user?.data?.id);

  localStorage.setItem("userId", user?.user?.data?.id);

  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <div className="xsm:max-w-[360px] m-auto mt-15 pb-22 lg:px-0 px-4">
        <div>
          <h1 className="mb-5 font-semibold text-center lg:text-title-xl2 text-title-md text-black-3">
            Create an account
          </h1>

          {step > 1 && (
            <div className="relative md:right-1/2">
              <Button
                text="Prev"
                type="button"
                leftIcon={MdOutlineKeyboardArrowLeft}
                leftIconStyle="text-[#ADB5BD] text-[25px]"
                onClick={() => setStep((prev) => prev - 1)}
                className="bg-white border flex items-center border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-4 hover:bg-gray-100 focus:outline-none"
              />
            </div>
          )}
        </div>
        <p className="text-title-sm text-[#0D6EFD] font-bold text-center mb-6">
          {step}/2
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "",
            city: "",
            university: "",
            phoneNumber: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              const res = await dispatch(registerUser(values));
              console.log("🚀 ~ onSubmit={ ~ res:", res);

              if (res.type === "registerUser/fulfilled") {
                resetForm();
                navigate("/email-confirmation");
              }
            } catch (error) {
              console.error("Submission error: ", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                {(step === 1 ? inputFieldsStep1 : inputFieldsStep2).map(
                  (field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block font-normal text-title-p text-black-3"
                      >
                        {field.label}
                        <FaAsterisk
                          size={6}
                          className="text-red-500 inline ml-1 mb-3 items-start"
                        />
                      </label>
                      {/* Handle select fields separately */}
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
                        <div className="relative flex items-center">
                          <Field
                            id={field.name}
                            name={field.name}
                            type={
                              field.name === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : field.name === "confirmPassword"
                                ? showConfirmPassword
                                  ? "text"
                                  : "password"
                                : field.type
                            }
                            placeholder={field.placeholder}
                            className="mt-3 p-3 text-secondary text-title-p focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                          />

                          {/* Show/hide password and confirm password icons */}
                          {(field.name === "password" ||
                            field.name === "confirmPassword") && (
                            <button
                              type="button"
                              onClick={
                                field.name === "password"
                                  ? togglePasswordVisibility
                                  : toggleConfirmPasswordVisibility
                              }
                              className="absolute right-3 top-10 transform -translate-y-1/2 text-primary"
                            >
                              {(field.name === "password" && showPassword) ||
                              (field.name === "confirmPassword" &&
                                showConfirmPassword) ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </button>
                          )}
                        </div>
                      )}
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  )
                )}
              </div>

              <div className="flex items-center justify-between max-w-full mb-10">
                {step === 1 ? (
                  <button
                    type="button"
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2 focus:outline-none w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(2);
                    }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2 focus:outline-none w-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-8 font-normal text-center text-title-p text-secondary">
          Already have an account?
          <Link to="/log-in" className="text-[#0D6EFD] underline">
            Log in
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
