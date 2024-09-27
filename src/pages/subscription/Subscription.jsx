import React from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Subscription = () => {
  return (
    <>
      <Header />
      <div className="grid lg:grid-cols-3   lg:mt-15 lg:mb-10  min-w-xl ">
        <div></div>

        <div className="flex flex-col items-center bg-[#007AFF17] w-full h-[510px] max-w-xs rounded-2xl justify-self-center">
          <h1 className="text-title-p text-black font-bold text-center mt-4 mb-10">
            Full Package
          </h1>
          <div>
            <p className="text-title-p text-[#3A57E8] font-semibold text-center">
              <span className="text-[96px]"> 99</span>MAD
            </p>
          </div>
        </div>

        <div className="flex justify-start  text-black text-title-p font-bold pr-30 ">
          SUBSCRIPTION PAGE WHERE USER PICKS PLAN AND PAYS (50Dhs because Badr
          is a cheap fuck)
        </div>
      </div>

      <div className="flex justify-end gap-30 items-center px-30">
        <button className="px-4 py-2 bg-[#007AFF] font-semibold text-title-p text-white rounded-md">
          Pay now
        </button>
        <button className="px-4 py-2 bg-[#808080] font-semibold text-title-p text-white  rounded-md ">
          Free Trial
        </button>
      </div>
    </>
  );
}

export default Subscription
