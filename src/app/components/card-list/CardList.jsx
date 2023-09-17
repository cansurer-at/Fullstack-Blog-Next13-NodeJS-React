import React from "react";
import styles from "./cardlist.module.css";
import Pagination from "../pagination/Pagination";

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <Pagination />
    </div>
  );
};

export default CategoryList;
