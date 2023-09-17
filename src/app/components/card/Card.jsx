import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src="/p1.jpeg" alt="" fill />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.02.2023 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>
        <h1 href='/'>Lorem ipsum dolar sit amet</h1>
        <p className={styles.desc} >Lorem ipsum dolar sit amet cansectur adisicising elit. Faecea! faremake dolar sit amet dolar sit fakdleasklf alfkfd adisicising adisicising adisicising adisicising in facebook zaore </p>
        <Link  className={styles.link} href='/' >Read More</Link>
      </div>
    </div>
  );
};

export default Card;
