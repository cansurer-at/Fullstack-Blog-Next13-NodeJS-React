import React from "react";
import styles from "./categorylist.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    const data = await res.json();
    console.log(data); // Log data to server console
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
};

const CategoryList = async () => {
  try {
    const data = await getData();

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>
        <div className={styles.categories}>
          {data.map((item) => (
            <Link
              key={item._id}
              className={`${styles.category} ${styles[item.slug]}`}
              href={`/blog?cat=${item.slug}`}
            >
              {item.slug}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
};

export default CategoryList;
