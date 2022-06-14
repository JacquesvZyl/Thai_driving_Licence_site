import React, { useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import ButtonWithSpinner from "../ui/buttonWithSpinner/ButtonWithSpinner.component";
import toast from "react-hot-toast";
import styles from "./SignupForm.module.scss";
import {
  createAuthUserWithEmailAndPassword,
  db,
  signInWithGooglePopup,
} from "../../firebase/firebase";
import { toastStyleError } from "../../utils/Global";
import googleImg from "../../assets/img/google.png";

function SignupForm() {
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  async function googleSignIn() {
    try {
      setLoading(true);
      const resp = await signInWithGooglePopup();

      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
      });
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  }

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value)
        throw new Error("Passwords do not match");
      const resp = await createAuthUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
      });
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  };

  return (
    <form className={styles.signUp__form}>
      <h1>Sign Up</h1>
      <ButtonWithSpinner
        type="button"
        className={styles.google__button}
        onClick={googleSignIn}
      >
        <img className={styles.google} src={googleImg} alt="google" />{" "}
        <span>Sign Up with Google</span>
      </ButtonWithSpinner>
      <div className={styles.or}>
        <span>OR</span>
      </div>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm Password"
      />
      <ButtonWithSpinner isLoading={isLoading} onClick={register}>
        Sign Up
      </ButtonWithSpinner>
    </form>
  );
}

export default SignupForm;
