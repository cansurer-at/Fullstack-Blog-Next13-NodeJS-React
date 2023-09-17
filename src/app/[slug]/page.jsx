import React from "react";
import styles from "./singlepage.module.css";
import Image from "next/image";
import Menu from "../components/menu/Menu";

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem ipsum dolar sit amet sdaf</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolar sit amet consectetur adisipisi elit. Undera
              places esse mollita mollan velir? Libvera qiuop bolutatmum
              masdfkl, kasdfglk asdfgasel ds quas eos. Uoor, cldl ractione
              kdocf.
            </p>
            <p>
              Lorem ipsum dolar sit amet consectetur adisipisi elit. Undera
              places esse mollita mollan velir? Libvera qiuop bolutatmum
              masdfkl, kasdfglk asdfgasel ds quas eos. Uoor, cldl ractione
              kdocf.
            </p>
            <h5>Hello loroem ipsum</h5>
            <p>
              Lorem ipsum dolar sit amet consectetur adisipisi elit. Undera
              places esse mollita mollan velir? Libvera qiuop bolutatmum
              masdfkl, kasdfglk asdfgasel ds quas eos. Uoor, cldl ractione
              kdocf.
            </p>
            <p>
              Lorem ipsum dolar sit amet consectetur adisipisi elit. Undera
              places esse mollita mollan velir? Libvera qiuop bolutatmum
              masdfkl, kasdfglk asdfgasel ds quas eos. Uoor, cldl ractione
              kdocf.
            </p>
          </div>
        </div>
        <Menu/>
      </div>
    </div>
  );
};

export default SinglePage;
