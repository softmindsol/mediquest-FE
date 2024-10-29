import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithToken } from "../../api";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  console.log("🚀 ~ VerifyEmail ~ verificationToken:", verificationToken);

  const FRONTEND_URL = "https://www.medquest.ma";
  console.log("🚀 ~ VerifyEmail ~ FRONTEND_URL:", FRONTEND_URL);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axiosWithToken.get(
          `/auth/verify-email/${verificationToken}`
        );
        console.log("🚀 ~ verifyUser ~ response:", response?.data);
        window.location.replace(`${FRONTEND_URL}/email-confirmation`);
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, [verificationToken]);

  return <div></div>;
};

export default VerifyEmail;
