import React from "react";
import styles from "./skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />
      <div className={styles.text}>
        <div className={styles.title} />
        <div className={styles.desc} />
        <div className={styles.desc} />
      </div>
    </div>
  );
};

export default Skeleton;
