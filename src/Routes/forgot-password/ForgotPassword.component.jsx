import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ButtonWithSpinner from "../../components/ui/buttonWithSpinner/ButtonWithSpinner.component";
import { forgotPassword } from "../../firebase/firebase";
import { toastStyle, toastStyleError } from "../../utils/Global";
import styles from "./ForgotPassword.module.scss";

function ForgotPassword() {
  const emailRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await forgotPassword(emailRef.current.value);

      toast(`E-maii sent! Please check your Spam folder`, {
        duration: 3500,
        style: toastStyle,
      });
    } catch (e) {
      toast(`⚠ ${e.message}`, {
        duration: 3000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <form className={styles.login__form}>
          <h1>Forgot Password</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <ButtonWithSpinner isLoading={isLoading} onClick={submit}>
            Submit
          </ButtonWithSpinner>
          <div className={styles.or}>
            <span>OR</span>
          </div>
          <Link className={styles.forgot__password} to="/login">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
