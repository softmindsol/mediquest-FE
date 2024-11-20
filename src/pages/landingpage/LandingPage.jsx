import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const LandingPage = () => {
  return (
    <>
      <Header />

      <div className="flex justify-end gap-5 pr-3 mt-12 mb-8 md:px-18">
        <Link to="/log-in">
          <button className="bg-[#3A57E8] font-semibold text-nowrap text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Log in
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="bg-[#3A57E8] text-nowrap font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Sign up{" "}
          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
