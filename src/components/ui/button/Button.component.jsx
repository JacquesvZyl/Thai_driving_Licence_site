import React from "react";
import styles from "./Button.module.scss";

function Button({ children, ...rest }) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}

export default Button;
