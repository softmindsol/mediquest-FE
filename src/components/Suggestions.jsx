import { useState, useCallback } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaPlus,
  FaRegCommentDots,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  getQuizQuesitons,
  likeDislikeQuestion,
} from "../store/features/quiz/quiz.service";

// Create memoized selectors
const selectQuiz = (state) => state?.quiz?.quiz || [];
const selectLikesAndDislikes = createSelector([selectQuiz], (quiz) => ({
  likes: quiz[1]?.likes || 0,
  dislikes: quiz[1]?.dislikes || 0,
  isUserLiked: quiz[1]?.isUserLiked || { liked: false, disliked: false },
  documentId: quiz[0]?.documentId || "",
  questionId: quiz[0]?.questionId || "",
}));

const Suggestions = ({ pageNo = "", id = "" }) => {
  const [isLoading, setLoading] = useState({
    likeIsLoading: false,
    dislikeIsLoading: false,
  });

  const dispatch = useDispatch();

  const { likes, dislikes, isUserLiked, documentId, questionId } = useSelector(
    selectLikesAndDislikes
  );

  const totalVotes = likes + dislikes;
  const likePercentage = totalVotes === 0 ? 0 : (likes / totalVotes) * 100;
  const dislikePercentage =
    totalVotes === 0 ? 0 : (dislikes / totalVotes) * 100;

  const handleLikeDislike = useCallback(
    async (action) => {
      setLoading((prev) => ({
        ...prev,
        [action === "like" ? "likeIsLoading" : "dislikeIsLoading"]: true,
      }));

      const res = await dispatch(
        likeDislikeQuestion({ action, documentId, questionId })
      );

      if (res.type === "likeDislikeQuestion/fulfilled") {
        await dispatch(
          getQuizQuesitons({
            pageNo,
            id,
            isNextClicked: true,
            isPrevClicked: false,
          })
        );
      }
      setLoading({ likeIsLoading: false, dislikeIsLoading: false });

    },
    [dispatch, documentId, questionId, pageNo, id]
  );

  const [showImproveSection, setShowImproveSection] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const handleToggle = () => setShowImproveSection((prev) => !prev);
  const addSuggestion = (text) =>
    setSuggestionText((prev) => (prev ? `${prev}, ${text}` : text));

  const renderLikeDislikeButton = (type, isLoading, isLiked, onClick) => {
    const Icon =
      type === "like"
        ? isLiked
          ? FaThumbsUp
          : BsHandThumbsUp
        : isLiked
        ? FaThumbsDown
        : BsHandThumbsDown;
    const colorClass = type === "like" ? "text-green-600" : "text-red-500";

    return (
      <button disabled={isLoading}>
        <Icon
          onClick={onClick}
          size={20}
          className={`${colorClass} ${isLoading && "opacity-50"}`}
        />
      </button>
    );
  };

  return (
    <div className="max-w-4xl p-6">
      {/* Votes */}
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center text-green-600">
          <BsHandThumbsUp /> {likes}
        </span>
        <span className="flex items-center ml-4 text-red-500">
          <BsHandThumbsDown /> {dislikes}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex h-2 rounded-full mb-7">
        <div
          style={{ width: `${likePercentage}%` }}
          className="h-full bg-green-600"
        ></div>
        <div
          style={{ width: `${dislikePercentage}%` }}
          className="h-full bg-red-500"
        ></div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 items-center border border-[#6c757d] rounded-xl px-2">
        <div className="border-r p-2 border-[#6c757d]">
          {renderLikeDislikeButton(
            "like",
            isLoading.likeIsLoading,
            isUserLiked.liked,
            () => handleLikeDislike("like")
          )}
        </div>
        <div className="border-r p-2 border-[#6c757d]">
          {renderLikeDislikeButton(
            "dislike",
            isLoading.dislikeIsLoading,
            isUserLiked.disliked,
            () => handleLikeDislike("dislike")
          )}
        </div>
        <div className="text-[#6c757d] flex items-center gap-2 p-2 border-r border-[#6c757d]">
          <FaRegCommentDots size={20} /> Discuss (2)
        </div>
        <button
          onClick={handleToggle}
          className="bg-gray-200 text-[#6c757d] p-2 rounded-lg hover:bg-gray-300"
        >
          Improve
        </button>
      </div>

      {/* Improve Section */}
      {showImproveSection && (
        <div className="mt-4 bg-white border border-[#E6E9EC] p-4 rounded-lg">
          <h2 className="mb-3 text-lg font-bold text-yellow-500">
            Improve this question
          </h2>
          <p className="mb-3 font-medium text-title-p">
            What is the main problem with this question?
          </p>
          <div className="flex flex-wrap gap-3 mb-3">
            {[
              "Not relevant for the exam",
              "Explanation not adequate",
              "Wrong category",
              "Not in keeping with current guidelines",
              "Spelling/grammar problems",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addSuggestion(suggestion)}
                className="bg-white text-[#11caf0] px-4 py-2 border border-[#11caf0] rounded-md"
              >
                <FaPlus className="inline mr-2" />
                {suggestion}
              </button>
            ))}
          </div>

          <textarea
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            placeholder="Enter your suggestions here..."
            className="w-full h-24 p-2 border border-[#E6E9EC] rounded-lg focus:outline-none"
          />

          <button className="px-4 py-2 mt-3 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Submit suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
