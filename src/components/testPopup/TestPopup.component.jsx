import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { returnResults } from "../../firebase/firebase";
import Button from "../ui/button/Button.component";
import styles from "./TestPopup.module.scss";

function TestPopup({ setShowTest, totalQuestionsInPool }) {
  const user = useSelector((state) => state.user.user);
  const [results, setResults] = useState(null);

  useEffect(() => {
    returnResults(user, setResults);
    console.log(results);
  }, []);

  console.log(results);
  return (
    <section className={styles.popup}>
      <div className={styles.text__container}>
        <h3>
          You will be given 50 random questions out of a pool of{" "}
          {totalQuestionsInPool}
        </h3>
        <p>
          In order to pass, you need <span>90%</span> correct{" "}
          <span>(45/50)</span>
        </p>
        <p>Good Luck!</p>
        <div className={styles.scores}>
          <h4>Previous 3 Scores:</h4>
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
      <Button onClick={() => setShowTest(true)}>Begin</Button>
    </section>
  );
}

export default TestPopup;
