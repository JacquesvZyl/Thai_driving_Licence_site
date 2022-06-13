import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { returnResults } from "../../firebase/firebase";
import Button from "../ui/button/Button.component";
import styles from "./TestPopup.module.scss";

function TestPopup({
  setShowTest,
  totalQuestionsInPool,
  generateRandomQuestions,
}) {
  const user = useSelector((state) => state.user.user);
  const [results, setResults] = useState(null);

  useEffect(() => {
    returnResults(user, setResults);
  }, [user]);

  function onStart() {
    generateRandomQuestions();
    setShowTest(true);
  }

  return (
    <section className={styles.popup}>
      <div className={styles.text__container}>
        <h3>
          You will be given 50 random questions out of a pool of{" "}
          {totalQuestionsInPool}.
        </h3>
        <p>
          In order to pass, you need <span>90%</span> correct{" "}
          <span>(45/50).</span>
        </p>
        <p>Good Luck!</p>
        <div className={styles.scores}>
          <h4>Your previous 3 results:</h4>
          {results ? (
            results.map((r) => {
              const newDate = new Date(r.date);
              return (
                <div className={styles.score} key={r.date}>
                  <p>{newDate.toLocaleString()}</p>
                  <p>
                    <span>Score:</span> {r.result}
                  </p>
                </div>
              );
            })
          ) : (
            <p>No tests taken (yet)</p>
          )}
        </div>
      </div>
      <Button onClick={onStart}>Begin</Button>
      <p className={styles.notice}>
        NOTE: Most of these questions were taken from{" "}
        <a href="https://move2thailand.com/driving-license-exam-in-thailand-2020/">
          THIS LINK
        </a>
        . and were originally translated from Thai to English via Google
        translate.
      </p>
    </section>
  );
}

export default TestPopup;
