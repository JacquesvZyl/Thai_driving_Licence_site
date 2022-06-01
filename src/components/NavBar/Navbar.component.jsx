import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../firebase/firebase";
import { logout } from "../../store/userSlice";
import styles from "./Navbar.module.scss";

function Navbar() {
  const userState = useSelector((state) => state.user.user);

  async function logoutHandler() {
    await signOutUser();
  }

  const loginBtn = userState?.uid ? (
    <li onClick={logoutHandler}>Logout</li>
  ) : (
    <li>
      <Link to="/Login">Login</Link>
    </li>
  );
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <h3>Logo Placeholder</h3>
        </Link>

        <ul>
          <li>Study</li>
          <li>
            <Link to="/mocktest">Take mock test</Link>
          </li>
          {loginBtn}
        </ul>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
