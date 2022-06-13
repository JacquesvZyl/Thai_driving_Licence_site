import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../firebase/firebase";

import styles from "./Navbar.module.scss";
import Hamburger from "hamburger-react";
import logo from "../../assets/img/Logo-1.png";

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
          <img className={styles.logo} src={logo} alt="Logo" />
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
