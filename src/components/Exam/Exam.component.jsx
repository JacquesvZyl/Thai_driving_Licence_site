import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { addAnswer } from "../../store/userSlice";
import { toastStyleError } from "../../utils/Global";
import Button from "../ui/button/Button.component";
import Spinner from "../ui/Spinner/Spinner.component";

import styles from "./Exam.module.scss";

function Exam({
  question,
  totalQuestions,
  currentQuestionNumber,
  setCurrentQuestion,
  setShowResult,
}) {
  const [selected, setSelected] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const isDone = currentQuestionNumber + 1 === +totalQuestions;

  const dispatch = useDispatch();

  useEffect(() => {
    if (question.imgName?.length < 1 || question.imgName === null) {
      setImageUrl(null);
      return;
    }

    async function getImage() {
      try {
        setLoading(true);
        const storage = getStorage();

        const result = question.imgName.map(async (imgName) => {
          const reference = ref(storage, `/images/${imgName}`);
          return await getDownloadURL(reference);
        });
        const data = await Promise.all(result);
        setImageUrl(data);
      } catch (e) {
        toast(`⚠ ${e.message}`, {
          duration: 2000,
          style: toastStyleError,
        });
      }
      setLoading(false);
    }
    getImage();
  }, [question.imgName]);

  async function nextQuestion() {
    if (selected === null) {
      toast(`⚠ Please select an answer`, {
        duration: 2000,
        style: toastStyleError,
      });
      return;
    }

    dispatch(
      addAnswer({
        question: question.question,
        imageUrl: imageUrl ? imageUrl : null,
        selectedAnswer: question.choice[selected],
        selectedAnswerNum: selected,
        correctAnswer: question.choice[question.answer],
        correctAnswerNum: question.answer,
      })
    );

    if (currentQuestionNumber + 1 === +totalQuestions) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prevVal) => prevVal + 1);
    }
    setImageUrl(null);
    setSelected(null);
  }

  function onAnswerSelect(e) {
    const { value } = e.target;
    setSelected(+value);
  }

  function isRadioSelected(num) {
    return selected === num ? true : false;
  }

  return (
    <div className={styles.test}>
      <div className={styles.questionNumber}>
        <h3>
          Question: {currentQuestionNumber + 1} out of {totalQuestions}
        </h3>
      </div>
      <div className={styles.questionContainer}>
        <legend>{question.question}</legend>
        {isLoading && <Spinner />}
        {imageUrl?.length > 0
          ? imageUrl.map((url, i) => {
              return (
                <div className={styles.image__container} key={i}>
                  <img className={styles.sign} src={url} alt="sign" />
                </div>
              );
            })
          : ""}

        <div className={styles.answers}>
          <div className={styles.question}>
            <input
              type="radio"
              id="question 1"
              value={0}
              onChange={onAnswerSelect}
              checked={isRadioSelected(0)}
            />
            <label htmlFor="question 1">{question.choice[0]}</label>
          </div>

          <div className={styles.question}>
            <input
              type="radio"
              id="question 2"
              value={1}
              onChange={onAnswerSelect}
              checked={isRadioSelected(1)}
            />
            <label htmlFor="question 2">{question.choice[1]}</label>
          </div>
          <div className={styles.question}>
            <input
              type="radio"
              id="question 3"
              value={2}
              onChange={onAnswerSelect}
              checked={isRadioSelected(2)}
            />
            <label htmlFor="question 3">{question.choice[2]}</label>
          </div>
          <div className={styles.question}>
            <input
              type="radio"
              id="question 4"
              value={3}
              onChange={onAnswerSelect}
              checked={isRadioSelected(3)}
            />
            <label htmlFor="question 4">{question.choice[3]}</label>
          </div>
        </div>
      </div>
      <Button onClick={nextQuestion}>
        {isDone ? "Check Results" : "Next"}
      </Button>
    </div>
  );
}

export default Exam;
