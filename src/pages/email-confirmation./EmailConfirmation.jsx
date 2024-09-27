import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { IoFlowerOutline } from "react-icons/io5";

const EmailVerification = () => {
 const [isEmailSent, setIsEmailSent] = useState(true); // Email alert visible
 const [isEmailVerified, setIsEmailVerified] = useState(false); // Email verification status

 const handleResendEmail = () => {
   // Logic to resend the email
   console.log("Resending email...");
 };

 const handleConfirmEmail = () => {
   // Logic to confirm the email
   setIsEmailVerified(true);
 };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        {/* Alert Box for Email Sent */}
        {isEmailSent && (
          <div className=" flex justify-between items-center p-4 mt-9 bg-[#CFF4FC] rounded-[6px] border border-[#6EDFF6] w-full max-w-lg">
            <div className="flex gap-3 items-center">
              <IoFlowerOutline size={16} className="text-[#055160]" />

              <span className="text-[12px] text-[#055160]">
                Email Sent! Check your inbox and spam!
              </span>
            </div>
            <button
              className="ml-4  focus:outline-none"
              onClick={() => setIsEmailSent(false)}
            >
              &times;
            </button>
          </div>
        )}

        {/* Modal Box */}
        <div className="w-full max-w-2xl mt-8  bg-white border border-[#CED4DA] rounded-xl ">
          <div className="flex justify-between items-center border-b border-[#CED4DA]  p-4 ">
            <h2 className="text-title-p font-semibold text-black">
              Email Confirmation
            </h2>
            <button
              className="text-gray-500 text-[20px] hover:text-gray-800 focus:outline-none"
              onClick={() => console.log("Close modal")}
            >
              &times;
            </button>
          </div>

          <p className="text-secondary text-title-p border-b border-[#CED4DA]  p-4">
            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
            for lightboxes, user notifications, or completely custom content.
            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
            for lightboxes, user notifications, or completely custom content.
          </p>

          <div className="flex justify-end gap-5 items-center p-4">
            <button
              onClick={handleResendEmail}
              className="px-4 py-2 bg-[#808080] font-semibold text-title-p text-white  rounded-md "
            >
              Resend email
            </button>

            <button
              onClick={handleConfirmEmail}
              className="px-4 py-2 bg-[#007AFF] font-semibold text-title-p text-white rounded-md"
            >
              I confirmed my email.
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmailVerification;
