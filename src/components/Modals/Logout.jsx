import React from "react";

const Logout = ({ onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-md">
      <div className="relative w-[494px] bg-white rounded-lg shadow-lg p-6">
        {/* Modal content */}
        <h2 className="text-[14px] text-[#111827] font-semibold text-left mb-3">
          Are you sure?
        </h2>
        <p className="text-[#6B7280] text-[14px]">
          Click the logout button if you would like to logout. See you soon!
        </p>

        {/* Buttons */}
        <div className="flex mt-6 justify-end items-end gap-3">
          <button
            className="py-2 px-3 bg-white border border-[#E5E7EB] text-[#374151] rounded text-[14px] font-medium"
            onClick={onClose} // Close modal on "Cancel"
          >
            Cancel
          </button>
          <button
            className="py-2 px-3 bg-[#DC3545] text-white rounded text-[14px] font-medium"
            onClick={onLogout} // Trigger logout on "Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
