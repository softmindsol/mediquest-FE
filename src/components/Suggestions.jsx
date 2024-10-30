import { useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaPlus, FaRegCommentDots } from "react-icons/fa";

const Suggestions = () => {
  const [showImproveSection, setShowImproveSection] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const handleToggle = () => {
    setShowImproveSection(!showImproveSection);
  };

  const addSuggestion = (text) => {
    setSuggestionText((prevText) => (prevText ? `${prevText}, ${text}` : text));
  };
  return (
    <div className="max-w-4xl p-6">
      <div className="flex gap-4 items-center border border-[#6c757d] rounded-xl px-2">
        <div className="border-r p-2 border-[#6c757d]">
          <BsHandThumbsUp size={20} className="text-green-600" />
        </div>
        <div className="border-r p-2 border-[#6c757d]">
          <BsHandThumbsDown size={20} className="text-red-500" />
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

          <button className="px-4 py-2 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Submit suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
