import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "../../components/results/Results.component";
import Test from "../../components/test/Test.component";
import { questions } from "../../Data/testData";
import { resetAnswers } from "../../store/userSlice";
import styles from "./MockTest.module.scss";
function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const stateAnswers = useSelector((state) => state.user.answers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stateAnswers) return;
    dispatch(resetAnswers());
  }, []);

  return (
    <div className={styles.mocktest}>
      {!showResults ? (
        <Test
          question={questions[currentQuestion]}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestionNumber={currentQuestion}
          totalQuestions={questions.length}
          setShowResults={setShowResults}
        />
      ) : (
        <Results
          setShowResults={setShowResults}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
    </div>
  );
}

export default MockTest;
