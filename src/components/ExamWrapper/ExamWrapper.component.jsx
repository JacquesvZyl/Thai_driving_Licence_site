import React, { useState } from "react";
import Exam from "../Exam/Exam.component";
import Results from "../results/Results.component";

function ExamWrapper({
  question,
  setCurrentQuestion,
  currentQuestionNumber,
  totalQuestions,
  showResult,
  setShowResult,
}) {
  return (
    <>
      {!showResult ? (
        <Exam
          question={question}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={totalQuestions}
          setShowResult={setShowResult}
        />
      ) : (
        <Results
          setShowResult={setShowResult}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
    </>
  );
}

export default ExamWrapper;
