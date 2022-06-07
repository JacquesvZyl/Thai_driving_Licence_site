import React from "react";

import styles from "./Hero.module.scss";
import bikeImg from "../../assets/img/bike.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className={styles.hero}>
      <section className={styles.hero__text}>
        <h1>
          Increase your chances of Passing your Thailand Driving Theory Test!
        </h1>
        <h2>Practice mock theory tests now.</h2>

        <Link to="/mocktest">Take free mock theory tests</Link>
      </section>

      <img src={bikeImg} alt="man and woman on bike" />
      <div className={styles.arch} />
    </div>
  );
}

export default Hero;
