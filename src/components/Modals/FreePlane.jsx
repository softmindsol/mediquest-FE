import React from "react";

const FreePlane = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[494px] bg-white rounded-lg shadow-lg p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-semibold text-center mb-6">Upgrade Plan</h2>
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md py-12 mb-8">
          <p className="text-gray-600">Your Current Plan</p>
          <p className="text-2xl font-bold text-gray-800">Free</p>
        </div>

        {/* Upgrade button */}
        <button
          className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => alert("Upgrading...")}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default FreePlane;
