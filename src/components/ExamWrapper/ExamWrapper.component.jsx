import React, { useState } from "react";
import Exam from "../Exam/Exam.component";
import Results from "../results/Results.component";

function ExamWrapper({
  question,
  totalQuestions,
  showResult,
  setShowResult,
  generateRandomQuestions,
}) {
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  return (
    <>
      {!showResult ? (
        <Exam
          question={question[[currentQuestionNumber]]}
          totalQuestions={totalQuestions}
          setShowResult={setShowResult}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestionNumber={currentQuestionNumber}
        />
      ) : (
        <Results
          setShowResult={setShowResult}
          setCurrentQuestion={setCurrentQuestion}
          generateRandomQuestions={generateRandomQuestions}
        />
      )}
    </>
  );
}

export default ExamWrapper;
