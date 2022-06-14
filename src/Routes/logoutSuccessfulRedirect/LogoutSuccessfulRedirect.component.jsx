import React from "react";
import { Link } from "react-router-dom";

import styles from "./LogoutSuccessfulRedirect.module.scss";

function LogoutSuccessfulRedirect() {
  return (
    <div className={styles.container}>
      <p>Logged out Succesfully.</p>
      <p>
        Click <Link to="/">here</Link> to return to the home page.
      </p>
    </div>
  );
}

export default LogoutSuccessfulRedirect;
