import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { toastStyleError } from "../../utils/Global";
import Spinner from "../ui/Spinner/Spinner.component";

import styles from "./StudyQuestion.module.scss";

function StudyQuestion({
  question,
  totalQuestions,
  allSelected,
  setAllSelected,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!question.imgName) return;

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

  function onAnswerSelect(e) {
    const { value } = e.target;
    setAllSelected((prevVal) => {
      return { ...prevVal, [question.id]: +value };
    });
  }

  function isRadioSelected(num) {
    /* return selected === num ? true : false; */
    return allSelected[question.id] === num ? true : false;
  }

  return (
    <div className={styles.test}>
      <div className={styles.questionContainer}>
        <h3>
          Question: {question.id + 1} out of {totalQuestions}
        </h3>
        <legend>{question.question}</legend>
        {isLoading && <Spinner />}
        {imageUrl &&
          imageUrl.map((url) => {
            return (
              <div className={styles.image__container} key={url}>
                <img className={styles.sign} key={url} src={url} alt="sign" />
              </div>
            );
          })}

        <div className={styles.answers}>
          <div className={styles.question}>
            <input
              type="radio"
              id={`question 1-${question.id}`}
              value={0}
              onChange={onAnswerSelect}
              checked={isRadioSelected(0)}
            />
            <label htmlFor={`question 1-${question.id}`}>
              {question.choice[0]}
              <span className={styles.checkmark}>
                {Number.isSafeInteger(allSelected[question.id])
                  ? question.answer === 0
                    ? " ✔"
                    : " ❌"
                  : null}
              </span>
            </label>
          </div>

          <div className={styles.question}>
            <input
              type="radio"
              id={`question 2-${question.id}`}
              value={1}
              onChange={onAnswerSelect}
              checked={isRadioSelected(1)}
            />
            <label htmlFor={`question 2-${question.id}`}>
              {question.choice[1]}{" "}
              <span className={styles.checkmark}>
                {Number.isSafeInteger(allSelected[question.id])
                  ? question.answer === 1
                    ? " ✔"
                    : " ❌"
                  : null}
              </span>
            </label>
          </div>
          <div className={styles.question}>
            <input
              type="radio"
              id={`question 3-${question.id}`}
              value={2}
              onChange={onAnswerSelect}
              checked={isRadioSelected(2)}
            />
            <label htmlFor={`question 3-${question.id}`}>
              {question.choice[2]}{" "}
              <span className={styles.checkmark}>
                {Number.isSafeInteger(allSelected[question.id])
                  ? question.answer === 2
                    ? " ✔"
                    : " ❌"
                  : null}
              </span>
            </label>
          </div>
          <div className={styles.question}>
            <input
              type="radio"
              id={`question 4-${question.id}`}
              value={3}
              onChange={onAnswerSelect}
              checked={isRadioSelected(3)}
            />
            <label htmlFor={`question 4-${question.id}`}>
              {question.choice[3]}{" "}
              <span className={styles.checkmark}>
                {Number.isSafeInteger(allSelected[question.id])
                  ? question.answer === 3
                    ? " ✔"
                    : " ❌"
                  : null}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyQuestion;
