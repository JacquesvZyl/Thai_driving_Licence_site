import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExamWrapper from "../../components/ExamWrapper/ExamWrapper.component";
import TestPopup from "../../components/testPopup/TestPopup.component";
import { questions } from "../../Data/testData";
import { resetAnswers } from "../../store/userSlice";
import styles from "./MockTest.module.scss";
function MockTest() {
  const [showTest, setShowTest] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const stateAnswers = useSelector((state) => state.user.answers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stateAnswers) return;
    dispatch(resetAnswers());
  }, []);

  function generateRandomQuestions() {
    const rand = [];
    for (let i = 0; i < 50; i++) {
      const randNum = Math.floor(Math.random() * questions.length) + 1;
      rand.push(randNum);
    }

    const randomQuest = rand.map((r) => questions[r]);

    setRandomQuestions(randomQuest);
    console.log(randomQuest);
  }

  return (
    <div className={styles.mocktest}>
      {showTest ? (
        <ExamWrapper
          question={randomQuestions}
          totalQuestions={randomQuestions.length}
          showResult={showResult}
          setShowResult={setShowResult}
          generateRandomQuestions={generateRandomQuestions}
        />
      ) : (
        <TestPopup
          setShowTest={setShowTest}
          totalQuestionsInPool={questions.length}
          generateRandomQuestions={generateRandomQuestions}
        />
        /*     <Results
          setShowResults={setShowResults}
          setCurrentQuestion={setCurrentQuestion}
        /> */
      )}
    </div>
  );
}

export default MockTest;
