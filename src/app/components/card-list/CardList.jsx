import React from "react";
import styles from "./cardlist.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const CardList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <Card />
      <Card />
      <Card />
      <Card />

      <Pagination />
    </div>
  );
};

export default CardList;
