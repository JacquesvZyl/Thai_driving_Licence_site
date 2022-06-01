import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPw,
  signInWithGooglePopup,
} from "../../firebase/firebase";
import { toastStyleError } from "../../utils/Global";
import ButtonWithSpinner from "../ui/buttonWithSpinner/ButtonWithSpinner.component";
import styles from "./LoginForm.module.scss";
import googleImg from "../../assets/img/google.png";

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  async function googleSignIn() {
    try {
      await signInWithGooglePopup();
      navigate("/");
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
  }

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPw(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  };

  return (
    <form className={styles.login__form}>
      <h1>Sign In</h1>
      <ButtonWithSpinner
        type="button"
        className={styles.google__button}
        onClick={googleSignIn}
      >
        <img className={styles.google} src={googleImg} alt="google" />{" "}
        <span>Sign in with Google</span>
      </ButtonWithSpinner>
      <div className={styles.or}>
        <span>OR</span>
      </div>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <ButtonWithSpinner isLoading={isLoading} onClick={signIn}>
        Sign In
      </ButtonWithSpinner>
    </form>
  );
}

export default LoginForm;
