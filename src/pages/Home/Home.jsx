import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Progress from "../../components/Progress";
import RecentTests from "../../components/RecentTests";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state?.user?.selectedUser || {});

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Welcome home ${user?.name || ""}!`} />
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
      <RecentTests />
      <Progress />
    </DefaultLayout>
  );
};

export default Home;
