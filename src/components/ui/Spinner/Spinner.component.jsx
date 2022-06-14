import React from "react";
import styles from "./Spinner.module.scss";
function Spinner({ width = "100px" }) {
  return (
    <div className={styles.spinner__container}>
      <span
        className={styles.spinner}
        style={{ width: width, height: width }}
      ></span>
    </div>
  );
}

export default Spinner;
