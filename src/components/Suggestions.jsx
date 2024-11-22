import { useCallback, useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaRegCommentDots, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDrawer } from "../context/drawer";
import { getComments } from "../store/features/discussion/discussion.service";
import {
  getQuizQuesitons,
  likeDislikeQuestion,
} from "../store/features/quiz/quiz.service";
import DiscussionDrawer from "./discussion/DiscussionDrawer";
import GenericDrawer from "./generic-drawer";
import Improvements from "./Improvements";

const Suggestions = ({ pageNo = "", id = "" }) => {
  const dispatch = useDispatch();

  const discussionCount = useSelector(
    (state) => state?.quiz?.quiz[1]?.discussionCount || 0
  );

  const selectQuiz = (state) => state?.quiz?.quiz || [];
  const selectLikesAndDislikes = createSelector([selectQuiz], (quiz) => ({
    likes: quiz[1]?.likes || 0,
    dislikes: quiz[1]?.dislikes || 0,
    isUserLiked: quiz[1]?.isUserLiked || { liked: false, disliked: false },
    documentId: quiz[0]?.documentId || "",
    questionId: quiz[0]?.questionId || "",
  }));

  const { comments = [], isApiFetched = false } = useSelector(
    (state) => state?.discussion || {}
  );

  const { likes, dislikes, isUserLiked, documentId, questionId } = useSelector(
    selectLikesAndDislikes
  );
  const handleGetDiscussion = async () => {
    if (comments.length === 0 && !isApiFetched)
      await dispatch(getComments({ question: questionId }));
  };

  const { openDrawer } = useDrawer();

  const openDiscussionDrawer = useCallback(() => {
    openDrawer(<DiscussionDrawer />, `Discussion(${discussionCount || 0})`);
  }, [comments?.total, openDrawer]);

  const [isLoading, setLoading] = useState({
    likeIsLoading: false,
    dislikeIsLoading: false,
  });

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
        <div
          onClick={openDiscussionDrawer}
          className="text-[#6c757d]  p-2 border-r cursor-pointer border-[#6c757d]"
        >
          <div
            className="flex items-center gap-x-2"
            onClick={handleGetDiscussion}
          >
            <FaRegCommentDots size={20} /> Discuss ({discussionCount || 0})
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="bg-gray-200 text-[#6c757d] p-2 rounded-lg hover:bg-gray-300"
        >
          Improve
        </button>
      </div>

      <Improvements
        showImproveSection={showImproveSection}
        suggestionText={suggestionText}
        setSuggestionText={setSuggestionText}
      />
      <GenericDrawer className="w-3/4 md:w-[29rem] lg:w-[30rem] xl:w-[34rem]" />
    </div>
  );
};

export default Suggestions;
