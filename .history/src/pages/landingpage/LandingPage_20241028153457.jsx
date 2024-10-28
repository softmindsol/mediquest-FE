import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import RecentTests from "../../components/RecentTests";
import Progress from "../../components/Progress";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn); // Ensure proper path to user state
  console.log("🚀 ~ Home ~ isLoggedIn:", isLoggedIn);

  return (
      
      <div className="flex justify-end gap-5 mb-8">
        <Link to="/subscription">
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Get Full Subscription
          </button>
        </Link>
        <Link to="/topic">
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Create Quiz
          </button>
        </Link>
      </div>
  );
};

export default LandingPage;
