import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
      const resp = await forgotPassword(emailRef.current.value);
      console.log(resp);
      toast(`E-maii sent! Check your Email as well as your Spam folder`, {
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
          <Link className={styles.forgot_password} to="/login">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
