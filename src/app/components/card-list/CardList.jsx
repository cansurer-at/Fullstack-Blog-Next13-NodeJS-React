import React from "react";
import styles from "./cardlist.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 8;

  const hasPrev = page > 1;
  const hasNext = page * POST_PER_PAGE < count;
  const uniqueTitles = new Set();

  // Sort posts based on the id field (assuming id is a number)
  posts.sort((a, b) => a.id - b.id);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts
          ?.filter((item) => item.title)
          .reduce((uniquePosts, item) => {
            if (!uniqueTitles.has(item.title)) {
              uniqueTitles.add(item.title);
              uniquePosts.push(item);
            }
            return uniquePosts;
          }, [])
          .map((item) => (
            <Card item={item} key={item.id} />
          ))}
      </div>
      <Pagination cat={cat} page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
