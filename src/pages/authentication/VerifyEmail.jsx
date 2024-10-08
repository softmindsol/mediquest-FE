import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithoutToken } from "../../api";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  console.log("🚀 ~ VerifyEmail ~ verificationToken:", verificationToken);

  const FRONTEND_URL = "http://93.93.112.135:8081";

  useEffect(() => {
    console.log("Hello");

    const verifyUser = async () => {
      try {
        const response = await axiosWithoutToken.get(
          `/verify-email/${verificationToken}`
        );

        if (response.data) {
          window.location.href = `${FRONTEND_URL}/email-confirmation`;
        } else {
          window.location.href = `${FRONTEND_URL}/email-confirmation`;
        }
      } catch (error) {
        window.location.href = `${FRONTEND_URL}/email-confirmation`;
      }
    };

    verifyUser();
  }, [verificationToken]);

  return <div className="bg-graydark"></div>;
};

export default VerifyEmail;
