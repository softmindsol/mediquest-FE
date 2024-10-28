import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import RecentTests from "../../components/RecentTests";
import Progress from "../../components/Progress";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn); // Ensure proper path to user state
  console.log("🚀 ~ Home ~ isLoggedIn:", isLoggedIn);

  return (
    <>
              <Header />

      <div className="flex justify-end gap-5 mb-8 px-10">
        <Link to="/subscription">
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
           Log in
          </button>
        </Link>
        <Link to="/topic">
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
Sign up          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
