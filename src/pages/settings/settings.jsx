import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewRegisterSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword, logout } from "../../store/features/auth/auth.service";
import FreePlane from "../../components/Modals/FreePlane";
import Logout from "../../components/Modals/Logout";

const inputFields = [
  { name: "oldPassword", type: "password", label: "Old Password:" },
  { name: "newPassword", type: "password", label: "New Password:" },
  { name: "confirmPassword", type: "password", label: "Confirm New Password:" },
];

const Settings = () => {
  const [isFreePlaneModalOpen, setIsFreePlaneModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.type === "logout/fulfilled") navigate("/log-in");
  };

  return (
    <DefaultLayout>
      <>
        <Breadcrumb pageName="Settings" />
        <div className="mt-3">
          <p className="text-sm font-medium text-black-2">
            If you wish to change your email{" "}
            <span className="text-[#0038FF]">contact</span> us at
            contact@medquest.com
          </p>
        </div>

        {/* Logout button with modal */}
        <div className="flex justify-end mb-10">
          <Button
            onClick={() => setIsLogoutModalOpen(true)}
            text="Logout"
            className="text-[#DC3545] bg-white font-semibold text-title-p rounded-[4px] px-7 py-2 border border-[#DC3545] focus:outline-none"
          />
          {isLogoutModalOpen && (
            <Logout
              onClose={() => setIsLogoutModalOpen(false)}
              onConfirm={handleLogout} // Add confirmation action
            />
          )}
        </div>

        <div className="bg-white rounded-xl border border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold border-b rounded-t-xl border-[#E9ECEF] px-3 py-2">
            Change Your Password
          </h2>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={NewRegisterSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log("Form Submitted Values:", values);

              try {
                const res = await dispatch(changePassword(values));
                console.log("🚀 ~ onSubmit={ ~ res:", res);

                resetForm();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {() => (
              <Form className="p-3 space-y-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
                  {inputFields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-[14px] block font-semibold text-black-3"
                      >
                        {field.label}
                      </label>
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        className="mt-3 py-1 px-3 text-secondary text-[14px] font-bold focus:outline-none rounded-[4px] w-full border border-[#E9ECEF] placeholder-secondary"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-secondary lg:pb-5">
                  Password should be at least 8 characters long, containing at
                  least 1 lowercase, 1 uppercase, and 1 number.
                </p>
                <Button
                  text="Save Changes to Password"
                  type="submit"
                  className="text-[#0D6EFD] font-semibold text-title-p rounded-[4px] px-3 py-1 border border-[#0D6EFD] focus:outline-none"
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold rounded-t-xl border-b border-[#E9ECEF] p-3">
            Reset Question History
          </h2>
          <div className="p-3 space-y-5">
            <p className="text-[15px] text-black-2 font-normal">
              This option permanently resets your question and answer history.
              This means that your performance data will be reset, access to the
              questions will be reset, and all timed tests will be deleted. It
              is similar to having a new account. Your personal notes will
              remain saved.
              <strong>Please note that this is irreversible.</strong>
            </p>
            <Button
              text="Reset Question History"
              className="text-[#DC3545] font-semibold text-title-p rounded-[4px] px-3 py-1 border border-[#DC3545] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg border mb-25 border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold border-b rounded-t-xl border-[#E9ECEF] p-3">
            Plan & Billing
          </h2>
          <div className="flex flex-col justify-center p-3 space-y-6 lg:flex-row lg:px-11 py-7 lg:space-y-0">
            <div className="flex flex-wrap justify-between w-full space-y-5 lg:w-1/2 lg:space-y-0">
              <div className="w-full space-y-2 lg:space-y-5 lg:w-auto">
                <span className="text-[13px] font-semibold text-[#6D6D6D]">
                  Plan
                </span>
                <div className="text-[15px] lg:font-semibold text-black">
                  PLAN NAME HERE
                </div>
              </div>
              <div className="w-full space-y-2 lg:space-y-5 lg:w-auto">
                <span className="text-[13px] lg:font-semibold text-[#6D6D6D]">
                  Payment
                </span>
                <div className="text-[15px] lg:font-semibold text-black">
                  99 MAD
                </div>
              </div>
              <div className="w-full space-y-2 lg:space-y-5 lg:w-auto">
                <span className="text-[13px] font-semibold text-[#6D6D6D]">
                  Next Billing Cycle
                </span>
                <div className="text-[15px] lg:font-semibold text-black">
                  07/08/2024
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between w-full gap-6 lg:flex-row lg:w-1/2 lg:justify-end">
              <span className="text-[13px] font-semibold text-[#6D6D6D] text-center lg:text-left">
                Cancel Subscription
              </span>
              <div>
                <Button
                  onClick={() => setIsFreePlaneModalOpen(true)}
                  text="Upgrade"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                />
                {isFreePlaneModalOpen && (
                  <FreePlane onClose={() => setIsFreePlaneModalOpen(false)} />
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-[#E6E9EC] mx-8 mt-4 py-4 font-medium text-center text-[14px] text-black-2">
            For any billing questions please
            <a
              href="mailto:contact@medquest.ma"
              className="text-[#0038FF] hover:underline ml-1"
            >
              contact us
            </a>
            <span className="text-black"> at contact@medquest.ma</span>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Settings;
