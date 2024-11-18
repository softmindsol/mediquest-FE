import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../store/features/quiz/quiz.service";
import Loader from "./Loader";
import distributeQuestions from "../utils/distribution";

const CreateQuizModal = ({ isOpen, closeModal, values }) => {
  const dispatch = useDispatch();
  const { subjectQuestions = [] } = useSelector(
    (state) => state?.user?.selectedUser
  );

  console.log(values.subject, "--values.subject");

  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    addLoading: false,
    startLoading: false,
  });

  console.log(values, "--values");
  const {
    name = "",
    mode = "",
    questionCount = 0,
    university = "",
    timerDuration = 1,
  } = values || {};

  // const { isLoading = false } = useSelector((state) => state?.quiz || {});

  const handleCreateQuiz = async (type) => {
    try {
      console.log("working..");

      let res;
      if (type === "add") {
        setLoading({ ...loading, addLoading: true });
        const subject = distributeQuestions(
          values.subject,
          subjectQuestions,
          values.questionCount
        );
        console.log("🚀 ~ handleCreateQuiz ~ subject:", subject);

        if (subject.length === 0) {
          setLoading(false);
          return;
        }

        res = await dispatch(
          createQuiz({
            subject,
            name,
            mode,
            questionCount,
            university,
            test: true,
            timerDuration: timerDuration,
          })
        );
        setLoading({ ...loading, addLoading: false });
      } else {
        setLoading({ ...loading, startLoading: true });
        const subject = distributeQuestions(
          values.subject,
          subjectQuestions,
          values.questionCount
        );
        console.log("🚀 ~ handleCreateQuiz ~ subject:", subject);

        if (subject.length === 0) {
          setLoading(false);
          return;
        }

        res = await dispatch(
          createQuiz({
            subject,
            name,
            mode,
            questionCount,
            university,
            timerDuration,
          })
        );
        setLoading({ ...loading, startLoading: false });
      }

      if (type === "start") {
        navigate(`/question/${res.payload.data.quiz._id}`);
        closeModal();
        return;
      }

      closeModal();
      toast.success(res.payload.message);
    } catch (error) {
      // toast.error("Failed to create quiz");
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6E6E6CC]">
      <div className="w-full max-w-lg p-6 bg-white rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-[#111827] font-semibold mb-2">
            Create Quiz
          </h2>
          <button
            type="button"
            className="text-[#6B7280] hover:text-gray-600"
            onClick={closeModal}
          >
            <RxCross2 />
          </button>
        </div>
        <p className="text-[#6B7280] text-subtitle-xsm mb-4">
          Please confirm your quiz settings.
        </p>
        <div className="flex justify-start gap-15">
          <div className="mb-6">
            <label className="block text-sm text-[#111827] font-semibold">
              Exam Name
            </label>
            <input
              type="text"
              placeholder="Exam Name here"
              value={values.name}
              disabled
              className="mt-3 px-4 py-2 text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] w-50 border border-[#CED4DA] placeholder-secondary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-[#111827] font-semibold">
              No. of Questions
            </label>
            <select
              value={values.questionCount}
              disabled
              className="mt-3 px-4 py-2 text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] border border-[#CED4DA] placeholder-secondary bg-white"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#111827] font-semibold">
            Test Mode
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium capitalize">
            {values?.mode}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#111827] font-semibold">
            University
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            {values.university}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#111827] font-semibold">
            Topics
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            {values?.subject?.map((s, index) => (
              <span key={index}>
                {s.name}
                {index < values.subject.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>

        <div className="flex justify-between mt-7">
          <button
            disabled={loading.addLoading}
            type="button"
            onClick={() => handleCreateQuiz("add")}
            className="text-[#6B7280] text-[13px] font-bold"
          >
            Add to my Tests
          </button>

          <button
            type="button"
            className="bg-[#007AFF] text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center"
            disabled={loading.startLoading}
            onClick={() => handleCreateQuiz("start")}
          >
            {loading.startLoading ? (
              <>
                <span className="">Loading...</span>
                <Loader className="w-4 h-4 border-white border-solid rounded-full animate-spin-1.5 border-t-transparent border-2" />
              </>
            ) : (
              "Start Quiz"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
