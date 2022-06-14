import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner/Spinner.component";
import styles from "./LoginSuccessfulRedirect.module.scss";

function LoginSuccessfulRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div className={styles.container}>
      <span>
        Successfully logged in. Please wait while we redirect you to the home
        page.
      </span>
      <Spinner width="50px" />
    </div>
  );
}

export default LoginSuccessfulRedirect;
