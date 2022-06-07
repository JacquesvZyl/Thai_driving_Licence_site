import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../firebase/firebase";
import { logout } from "../../store/userSlice";
import styles from "./Navbar.module.scss";
import Hamburger from "hamburger-react";

function Navbar() {
  const userState = useSelector((state) => state.user.user);
  const [isOpen, setOpen] = useState(false);

  async function logoutHandler() {
    await signOutUser();
    setOpen(false);
  }

  const loginBtn = userState?.uid ? (
    <li onClick={logoutHandler}>Logout</li>
  ) : (
    <Link to="/Login" onClick={() => setOpen(false)}>
      Login
    </Link>
  );
  return (
    <>
      <header className={styles.header}>
        <Link to="/" onClick={() => setOpen(false)}>
          <h3>Logo Placeholder</h3>
        </Link>

        <Hamburger toggled={isOpen} toggle={setOpen} />

        <div
          className={styles.desktop__links}
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          <Link to="/study" onClick={() => setOpen(false)}>
            Study
          </Link>

          <Link to="/mocktest" onClick={() => setOpen(false)}>
            Take mock test
          </Link>

          {loginBtn}
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
