import { useCallback, useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaRegCommentDots, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useDrawer } from "../context/drawer";
import { getComments } from "../store/features/discussion/discussion.service";
import { likeDislikeQuestion } from "../store/features/quiz/quiz.service";
import DiscussionDrawer from "./discussion/DiscussionDrawer";
import GenericDrawer from "./generic-drawer";
import Improvements from "./Improvements";

const Suggestions = ({ setLike, setDisLike, like, dislike }) => {
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();
  const discussionCount = useSelector(
    (state) => state?.quiz?.quiz[1]?.discussionCount || 0
  );

  const { comments = [], isApiFetched = false } = useSelector(
    (state) => state?.discussion || {}
  );

  const questionId = useSelector(
    (state) => state?.quiz?.quiz[0]?.questionId || ""
  );

  const documentId = useSelector(
    (state) => state?.quiz?.quiz[0]?.documentId || ""
  );

  const [isLoading, setLoading] = useState({
    likeIsLoading: false,
    dislikeIsLoading: false,
  });

  const [showImproveSection, setShowImproveSection] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const handleToggle = () => setShowImproveSection((prev) => !prev);

  const handleGetDiscussion = useCallback(async () => {
    if (comments.length === 0 && !isApiFetched) {
      await dispatch(getComments({ question: questionId }));
    }
  }, [dispatch, comments.length, isApiFetched, questionId]);

  const handleLikeDislike = useCallback(
    async (action) => {
      setLoading((prev) => ({
        ...prev,
        [action === "like" ? "likeIsLoading" : "dislikeIsLoading"]: true,
      }));

      try {
        const res = await dispatch(
          likeDislikeQuestion({ action, documentId, questionId })
        );

        if (res.type === "likeDislikeQuestion/fulfilled") {
          if (action === "like") {
            if (like) {
              setLike(false);
            } else {
              setLike(true);
              setDisLike(false);
            }
          } else {
            if (dislike) {
              setDisLike(false);
            } else {
              setDisLike(true);
              setLike(false);
            }
          }
        }
      } catch (error) {
        console.error("Like/Dislike failed:", error);
      } finally {
        setLoading({ likeIsLoading: false, dislikeIsLoading: false });
      }
    },
    [dispatch, documentId, questionId, like, dislike, setLike, setDisLike]
  );

  const openDiscussionDrawer = useCallback(() => {
    handleGetDiscussion();
    openDrawer(<DiscussionDrawer />, `Discussion(${discussionCount || 0})`);
  }, [handleGetDiscussion, openDrawer, discussionCount]);

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
      <div className="flex md:gap-4 items-center border w-72 md:w-100 border-[#6c757d] rounded-xl md:px-2">
        <div className="border-r p-2 border-[#6c757d]">
          {renderLikeDislikeButton("like", isLoading.likeIsLoading, like, () =>
            handleLikeDislike("like")
          )}
        </div>
        <div className="border-r p-2 border-[#6c757d]">
          {renderLikeDislikeButton(
            "dislike",
            isLoading.dislikeIsLoading,
            dislike,
            () => handleLikeDislike("dislike")
          )}
        </div>
        <div
          onClick={openDiscussionDrawer}
          className="text-[#6c757d]  p-2 border-r cursor-pointer border-[#6c757d]"
        >
          <div className="flex items-center gap-x-2">
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
