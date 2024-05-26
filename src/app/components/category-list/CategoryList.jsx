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

// Predefined colors
const colors = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A1', // Pink
  '#F3FF33', // Yellow
  '#33FFF1', // Cyan
  '#8A33FF', // Purple
];

// Function to get a specific color from the predefined list
const getColor = (index) => {
  return colors[index % colors.length] + '31'; // Adding transparency
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
          {data.map((item, index) => (
            <Link
              key={item._id}
              className={styles.category}
              href={`/blog?cat=${item.slug}`}
              style={{ backgroundColor: getColor(index) }}
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
