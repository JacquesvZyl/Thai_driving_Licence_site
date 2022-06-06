import React from "react";
import Button from "../ui/button/Button.component";
import styles from "./TestPopup.module.scss";

function TestPopup({ setShowTest, totalQuestionsInPool }) {
  return (
    <section className={styles.popup}>
      <div className={styles.text__container}>
        <h3>
          You will be given 50 random questions out of a pool of{" "}
          {totalQuestionsInPool}
        </h3>
        <p>
          In order to pass, you need <span>80%</span> correct{" "}
          <span>(45/50)</span>
        </p>
        <p>Good Luck!</p>
      </div>
      <Button onClick={() => setShowTest(true)}>Begin</Button>
    </section>
  );
}

export default TestPopup;
