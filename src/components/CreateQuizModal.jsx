import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createQuiz } from "../store/features/quiz/quiz.service";
import toast from "react-hot-toast";

const CreateQuizModal = ({ isOpen, closeModal, values }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateQuiz = async (type) => {
    const res = await dispatch(createQuiz(values));
    console.log("🚀 ~ handleCreateQuiz ~ res:", res);

    console.log("🚀 ~ handleCreateQuiz ~ type:", res.payload.data.quiz._id);

    if (type === "start") {
      navigate(`/question/${res.payload.data.quiz._id}`);
      closeModal();
      return;
    }

    closeModal();
    toast.success(res.payload.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6E6E6CC] ">
      <div className="w-full max-w-lg p-6 bg-white rounded-md">
        <div className="flex items-center justify-between ">
          <h2 className="text-base text-[#111827] font-semibold mb-2">
            Create Quiz
          </h2>
          <button
            className="text-[#6B7280]   hover:text-gray-600"
            onClick={closeModal}
          >
            <RxCross2 />
          </button>
        </div>
        <p className="text-[#6B7280] text-subtitle-xsm mb-4">
          Please confirm your quiz settings.
        </p>
        <div className="flex justify-start gap-15">
          {/* Exam Name Input */}
          <div className="mb-6">
            <label className="block text-sm  text-[#111827] font-semibold">
              Exam Name
            </label>
            <input
              type="text"
              placeholder="Exam Name here"
              value={values.name}
              disabled
              className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] w-50 border border-[#CED4DA] placeholder-secondary"
            />
          </div>

          {/* No. of Questions */}
          <div className="mb-6">
            <label className="block text-sm  text-[#111827] font-semibold">
              No. of Questions
            </label>
            <select
              value={values.questionCount}
              disabled
              className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px]  border border-[#CED4DA] placeholder-secondary bg-white"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {/* Test Mode */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            Test Mode
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium capitalize">
            {values?.mode}
          </p>
        </div>

        {/* University */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            University
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            {values.university}...
          </p>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            Topics
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            {values?.subject?.map((s) => (
              <span>{s.name}</span>
            ))}
          </p>
        </div>

        {/* Start Quiz Button */}
        <div className="flex justify-between mt-7">
          <Link to="">
            <span
              onClick={() => handleCreateQuiz("add")}
              className="ml-2 text-[#6B7280] text-[13px] font-bold"
            >
              Add to my Tests
            </span>
          </Link>

          <button
            className="bg-[#007AFF] text-white font-semibold px-4 py-2 rounded-md"
            onClick={() => handleCreateQuiz("start")}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
