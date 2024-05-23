import React from "react";
import styles from "./categorylist.module.css";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + '31'; // Adding transparency
};

const CategoryList = async () => {
  try {
    const data = await getData();

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    return (
      <div className={styles.container}>
        <div className={styles.categories}>
          {data.map((item) => (
            <Link
              key={item._id}
              className={styles.category}
              href={`/blog?cat=${item.slug}`}
              style={{ backgroundColor: getRandomColor() }}
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
