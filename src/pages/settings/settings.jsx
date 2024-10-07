import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewRegisterSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link } from "react-router-dom";

const inputFields = [
  {
    name: "oldPassword",
    type: "password",
    label: "Old Password:",
  },
  {
    name: "password",
    type: "password",
    label: "New Password:",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm new password:",
  },
];

const Settings = () => {
  return (
    <DefaultLayout>
      <>
        <Breadcrumb pageName="Settings" />

        <div className=" mt-3">
          <p className="text-sm text-black-2 font-medium">
            If you wish to change your email{" "}
            <span className="text-[#0038FF]">contact</span> us at
            contact@medquest.com
          </p>
        </div>
        <div className="flex justify-end mb-10">
          <Button
            text="Logout"
            type="submit" // Ensure the button type is submit
            className="text-[#DC3545] bg-white font-semibold text-title-p rounded-[4px] px-5 py-1 border border-[#DC3545]    focus:outline-none "
          />
        </div>
        <div className=" bg-white rounded-lg border border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold  border-b border-[#E9ECEF] p-3 ">
            Change your password
          </h2>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={NewRegisterSchema}
            onSubmit={(values) => {
              console.log("Form Submitted Values:", values); // Log form values here
            }}
          >
            {() => (
              <Form className="space-y-5 p-3">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-[14px] block font-semibold text-black-3"
                      >
                        {field?.label}
                      </label>
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-3 py-1 px-3  text-secondary text-[14px] font-bold focus:outline-none rounded-[4px] w-full border border-[#E9ECEF] placeholder-secondary"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-secondary font-medium">
                  password should be at least 8 long and contain at least 1
                  lowercase, 1 uppercase and 1 number
                </p>

                <Button
                  text="Save change to password"
                  type="submit" // Ensure the button type is submit
                  className="text-[#0D6EFD] font-semibold text-title-p rounded-[4px] px-3 py-1 border border-[#0D6EFD]    focus:outline-none "
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-6 bg-white rounded-lg border border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold  border-b border-[#E9ECEF] p-3 ">
            Reset the question history
          </h2>
          <div className="p-3 space-y-5">
            <p className="text-[15px] text-black-2 font-normal">
              This option permanently resets your question and answer history.
              This means that your performance data will be reset, access to the
              questions will be reset and all timed tests be deleted. It is
              similar to having a new account. Your personal notes will however
              be saved and available after you've reset your account. Reseting
              your history may be useful if you want to go over the questions
              again (even the ones you got right) or simply. want a fresh start
              with the scoring data reset.
              <strong>Please note that this is irreversible.</strong>
            </p>

            <Button
              text="Reset question history"
              type="submit" // Ensure the button type is submit
              className="text-[#DC3545] font-semibold text-title-p rounded-[4px] px-3 py-1 border border-[#DC3545]    focus:outline-none "
            />
          </div>
        </div>
        <div className="mt-6 bg-white rounded-lg border mb-5 border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold  border-b border-[#E9ECEF] p-3 ">
            Plan & Billing
          </h2>
          <div className="p-3 flex justify-center px-11 py-7 ">
            <div className="flex justify-between w-1/2 ">
              <div className="space-y-5 ">
                <span className="text-[13px] font-semibold text-[#6D6D6D] ">
                  Plan
                </span>
                <div className="text-[15px] font-semibold text-black">
                  PLAN NAME HERE
                </div>
              </div>
              <div className="space-y-5 ">
                <span className="text-[13px] font-semibold text-[#6D6D6D] ">
                  Payment
                </span>
                <div className="text-[15px] font-semibold text-black">
                  99 MAD
                </div>
              </div>

              <div className="space-y-5 ">
                <span className="text-[13px] font-semibold text-[#6D6D6D] ">
                  Next Billing Cycle
                </span>
                <div className="text-[15px] font-semibold text-black">
                  07/08/2024
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-end   gap-6 items-start ">
              <span className="text-[13px] font-semibold text-[#6D6D6D] item-center">
                Cancel Subscription
              </span>
              <button className="bg-[#007AFF] text-white text-base font-semibold px-5 py-2 rounded-md ">
                Upgrade
              </button>
            </div>
          </div>
          <div className="border-t border-[#E6E9EC] mx-8 mt-4 py-4 text-center text-[14px] text-black-2">
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
