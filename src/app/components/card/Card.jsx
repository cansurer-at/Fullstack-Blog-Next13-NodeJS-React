"use client"
import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  const truncateDescription = (desc, length) => {
    if (desc.length <= length) return desc;
    return desc.substring(0, length) + "...";
  };

  // Function to calculate approximate time to read
  const calculateReadingTime = (text) => {
    // Average reading speed in words per minute
    const wordsPerMinute = 200;
    // Calculate total words in the text
    const words = text.split(/\s+/).length;
    // Calculate reading time in minutes
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            src={item.img}
            alt={item.title}
            layout="fill"
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)}{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        {item.desc && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: truncateDescription(item.desc, 200),
            }}
          />
        )}
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More ({calculateReadingTime(item.desc)} min)
        </Link>
      </div>
    </div>
  );
};

export default Card;
