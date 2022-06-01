import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAnswers } from "../../store/userSlice";
import Button from "../ui/button/Button.component";
import styles from "./Results.module.scss";

function Results({ setShowResults, setCurrentQuestion }) {
  const answersState = useSelector((state) => state.user.answers);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const dispatch = useDispatch();

  function reset() {
    setShowResults(false);
    setCurrentQuestion(0);
    dispatch(resetAnswers());
  }

  useEffect(() => {
    const total = answersState.filter(
      (answer) => !answer.correctAnswer.localeCompare(answer.selectedAnswer)
    );
    setTotalCorrect(total.length);
  }, [answersState]);

  const results = answersState?.map((answer, i) => {
    return (
      <div key={i} className={styles.answer}>
        <h3>Question {i + 1}</h3>
        <div className={styles.question}>
          <h4>{answer.question}</h4>
        </div>
        {!answer.correctAnswer.localeCompare(answer.selectedAnswer) ? (
          <div className={styles.correct}>
            <span>Your answer: {answer.selectedAnswer}</span>
          </div>
        ) : (
          <>
            <div className={styles.correct__blue}>
              <span> Correct Answer: {answer.correctAnswer}</span>
            </div>
            <div className={styles.wrong}>
              <span>Your Answer: {answer.selectedAnswer}</span>
            </div>
          </>
        )}
      </div>
    );
  });
  return (
    <div className={styles.answers}>
      {results}
      <p>
        You have {totalCorrect} out of {answersState.length} Correct
      </p>
      <p>{((totalCorrect / answersState.length) * 100).toFixed(0)}%</p>
      <Button onClick={reset}>Again?</Button>
    </div>
  );
}

export default Results;
