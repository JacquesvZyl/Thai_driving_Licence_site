import React, { useState } from "react";
import LoginForm from "../../components/forms/LoginForm.component";
import SignupForm from "../../components/forms/SignupForm.component";
import styles from "./Login.module.scss";

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  function onSignupChangeHandler() {
    setShowSignup((prevVal) => !prevVal);
  }
  return (
    <div className={styles.login}>
      <h2>
        Sign {showSignup ? "up" : "in"} now to get free access to over 400 exam
        questions and randomized mock exams.
      </h2>
      <div className={styles.login__body}>
        {showSignup ? <SignupForm /> : <LoginForm />}
        <div className={styles.showSignupContainer}>
          <span className={styles.question}>
            {showSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <span className={styles.link} onClick={onSignupChangeHandler}>
            {showSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
