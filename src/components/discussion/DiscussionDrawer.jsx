import { useEffect, useState } from "react";
import Comment from "./Comment";
import ShowComment from "./ShowComment";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getComments } from "../../store/features/discussion/discussion.service";

const DiscussionDrawer = () => {
  //   const dispatch = useDispatch();
  //   const selectQuiz = (state) => state?.quiz?.quiz || [];
  //   const quizQuestion = createSelector([selectQuiz], (quiz) => ({
  //     questionId: quiz[0]?.questionId || "",
  //   }));
  //   const { questionId: question } = useSelector(quizQuestion);

  return (
    <div className="">
      <Comment />
      <div className="mt-8">
        <ShowComment />
      </div>
    </div>
  );
};

export default DiscussionDrawer;
