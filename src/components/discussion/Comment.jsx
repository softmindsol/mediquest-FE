import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  addComment,
  getComments,
} from "../../store/features/discussion/discussion.service";
import Loader from "../Loader";

const Comment = () => {
  const dispatch = useDispatch();

  const selectQuiz = (state) => state?.quiz?.quiz || [];
  const quizQuestion = createSelector([selectQuiz], (quiz) => ({
    questionId: quiz[0]?.questionId || "",
  }));
  const [isLoading, setLoading] = useState(false);
  const { questionId: question } = useSelector(quizQuestion);

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    setError(""); 

    const res = await dispatch(addComment({ question, text }));
    setLoading(false);

    if (res.type === "addComment/fulfilled") {
      dispatch(getComments({ question }));
    }

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full px-2 py-1.5 border h-[86px] text-sm border-[#DEE2E6] rounded focus:ring-4 focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Submit a new comment..."
      />
      {/* Display error message if there is one */}
      {error && <p className="mb-1 text-sm text-red-500">{error}</p>}

      <div className="flex">
        <button
          disabled={isLoading}
          type="submit"
          className="px-4 py-2 text-sm bg-[#0DCAF0] text-black rounded-md"
        >
          {isLoading ? (
            <div className="flex gap-x-2">
              <span className="font-medium text-black">Loading...</span>

              <Loader className="w-4 h-4 border-black border-solid rounded-full animate-spin-1.5 border-t-transparent border-2" />
            </div>
          ) : (
            "Submit a new question/comment"
          )}
        </button>
      </div>
    </form>
  );
};

export default Comment;
