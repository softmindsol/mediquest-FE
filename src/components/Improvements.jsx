import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { addImprovements } from "../store/features/quiz/quiz.service";
import { useState } from "react";

const Improvements = ({
  showImproveSection,
  suggestionText,
  setSuggestionText,
}) => {
  const selectQuiz = (state) => state?.quiz?.quiz || [];

  const quiz = createSelector([selectQuiz], (quiz) => ({
    documentId: quiz[0]?.documentId || "",
    questionId: quiz[0]?.questionId || "",
    questionText: quiz[0]?.question || "",
  }));

  const dispatch = useDispatch();
  const { questionText, documentId, questionId } = useSelector(quiz);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestionText.trim()) {
      setError("Please enter a suggestion before submitting.");
      return;
    }
    setError("");
    await dispatch(
      addImprovements({
        question: questionId,
        document: documentId,
        questionText,
        text: suggestionText,
      })
    );

    setSuggestionText("");
  };

  const handleAddSuggestion = (suggestion) => {
    // Allow only one suggestion at a time
    setSuggestionText(suggestion);
  };

  return (
    <form onSubmit={handleSubmit}>
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
                type="button"
                onClick={() => handleAddSuggestion(suggestion)}
                disabled={suggestionText === suggestion} // Disable the button if the suggestion is already selected
                className={`bg-white text-[#11caf0] px-4 py-2 border border-[#11caf0] rounded-md ${
                  suggestionText === suggestion
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button className="px-4 py-2 mt-3 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Submit suggestions
          </button>
        </div>
      )}
    </form>
  );
};

export default Improvements;
