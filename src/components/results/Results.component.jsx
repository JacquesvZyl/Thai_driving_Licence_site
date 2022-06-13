import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResult } from "../../firebase/firebase";
import { resetAnswers } from "../../store/userSlice";
import Button from "../ui/button/Button.component";
import styles from "./Results.module.scss";

function Results({
  setShowResult,
  setCurrentQuestion,
  generateRandomQuestions,
}) {
  const answersState = useSelector((state) => state.user.answers);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function reset() {
    setShowResult(false);
    setCurrentQuestion(0);
    dispatch(resetAnswers());
    generateRandomQuestions();
  }

  useEffect(() => {
    const total = answersState?.filter(
      (answer) => answer.correctAnswerNum === answer.selectedAnswerNum
    );
    setTotalCorrect(total.length);

    async function setResults() {
      const totalPercentage = `${(
        (total.length / answersState.length) *
        100
      ).toFixed(0)}%`;
      await addResult(user, totalPercentage);
    }

    setResults();
  }, [answersState, user]);

  const results = answersState?.map((answer, i) => {
    return (
      <div key={i} className={styles.answer}>
        <h3>Question {i + 1}</h3>
        <div className={styles.question}>
          <h4>{answer.question}</h4>
          {answer.imageUrl && (
            <img className={styles.sign} src={answer.imageUrl} />
          )}
        </div>
        {answer.correctAnswerNum === answer.selectedAnswerNum ? (
          <div className={styles.correct}>
            <span>
              <span className={styles.bold}>Your Answer:</span>{" "}
              {answer.selectedAnswer}
            </span>
          </div>
        ) : (
          <>
            <div className={styles.wrong}>
              <span>
                <span className={styles.bold}>Your Answer:</span>{" "}
                {answer.selectedAnswer}
              </span>
            </div>
            <div className={styles.correct__blue}>
              <span> Correct Answer: {answer.correctAnswer}</span>
            </div>
          </>
        )}
      </div>
    );
  });
  return (
    <div className={styles.answers}>
      <div className={styles.results}>
        <p>
          You have {totalCorrect} out of {answersState.length} Correct.{" "}
          <span>
            ({((totalCorrect / answersState.length) * 100).toFixed(0)}%)
          </span>
        </p>
        <p>
          Result:{" "}
          {((totalCorrect / answersState.length) * 100).toFixed(0) >= 90 ? (
            <span className={styles.pass}>Pass</span>
          ) : (
            <span className={styles.fail}>Fail</span>
          )}{" "}
        </p>
      </div>
      {results}

      <Button onClick={reset}>Again?</Button>
    </div>
  );
}

export default Results;
