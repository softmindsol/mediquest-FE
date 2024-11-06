import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithToken } from "../../api";

const VerifyEmail = () => {
  const { verificationToken } = useParams();

  const FRONTEND_URL = "https://www.medquest.ma";

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axiosWithToken.get(
          `/auth/verify-email/${verificationToken}`
        );
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
