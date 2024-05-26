import React from "react";
import styles from "./under-cons.module.css";


const UnderCons = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.crane}>
          <div className={styles.cable}></div>
          <div className={styles.hook}></div>
        </div>
        <div className={styles.message}>
          <h1>Page Under Construction</h1>
          <p className={styles.text}>
            We are working hard to bring you something amazing! Please check
            back soon.
          </p>
        </div>
      </div>
    </>
  );
};

export default UnderCons;
