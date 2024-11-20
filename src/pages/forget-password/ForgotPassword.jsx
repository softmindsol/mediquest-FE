import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setMessage(""); // Clear any previous success messages

    console.log(email);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
    } catch (err) {
      setError("Unable to process your request. Please try again later.");
    }
  };

  return (
    <section className="flex h-[100vh] items-center">
      <div className="w-[75%] mx-auto rounded-3xl bg-white shadow-[#F0F0F0] shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] drop-shadow-xl">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full py-12"
        >
          <div className="w-[80%]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-6 font-semibold text-center lg:text-[32px] text-title-md text-black-2">
                Forgot Password
              </h1>
              <p className="text-center lg:text-title-xsm text-title-p text-secondary mb-13">
                Please enter your email address to search for your account.
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="mb-2 bg-[#F5F5F5] border-[2px] border-[#D1D5DB] placeholder:text-[#374151] placeholder-[#D1D5DB] h-14 w-full rounded-xl pl-4"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <p className="mb-6 text-sm font-medium text-red-500">{error}</p>
              )}
            </div>
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="bg-[#007AFF] hover:bg-[rgb(0,94,255)] text-white rounded-[20px]  text-2xl font-semibold h-16 mb-8 px-16 py-4"
              >
                Send
              </button>
            </div>
            {message && (
              <p className="mt-4 text-sm font-medium text-center text-green-600">
                {message}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 mb-4 mt-7">
              <p className="text-center text-text-p font-normal text-[#3F3F3F] mt-12">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-[#0047FF] whitespace-nowrap"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
