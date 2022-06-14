import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../components/forms/LoginForm.component";
import SignupForm from "../../components/forms/SignupForm.component";
import LoginSuccessfulRedirect from "../../components/loginSuccessfulRedirect/LoginSuccessfulRedirect.component";
import styles from "./Login.module.scss";

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const user = useSelector((state) => state.user.user);

  function onSignupChangeHandler() {
    setShowSignup((prevVal) => !prevVal);
  }
  return user ? (
    <LoginSuccessfulRedirect />
  ) : (
    <div className={styles.login}>
      <h2>
        Sign {showSignup ? "up now" : "in"} and get free access to over 400 exam
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
