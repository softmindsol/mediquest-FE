import decryptNumber from "../utils/decryptKey";
import caesarCipherDecrypt from "../utils/decryptQuestion";

const decryptQuestionData = (question, secretKey) => {
  console.log(secretKey);

  const decryptedStatus = decryptNumber(question.status, secretKey);
  const decryptedQuestion = caesarCipherDecrypt(
    question.question,
    decryptedStatus
  );
  const decryptedOptions = question.options.map((option) =>
    caesarCipherDecrypt(option, decryptedStatus)
  );

  return {
    ...question,
    question: decryptedQuestion,
    options: decryptedOptions,
  };
};

export default decryptQuestionData;
