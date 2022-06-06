import React, { useEffect, useState } from "react";
import StudyQuestion from "../StudyQuestion/StudyQuestion.component";
import styles from "./StudyQuestionWrapper.module.scss";

function StudyQuestionWrapper({ currentItems, totalQuestions }) {
  const [allSelected, setAllSelected] = useState({});
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentItems]);

  return (
    <div className={styles.wrapper}>
      {currentItems &&
        currentItems.map((question) => (
          <StudyQuestion
            question={question}
            key={question.id}
            totalQuestions={totalQuestions}
            allSelected={allSelected}
            setAllSelected={setAllSelected}
          />
        ))}
    </div>
  );
}

export default StudyQuestionWrapper;
