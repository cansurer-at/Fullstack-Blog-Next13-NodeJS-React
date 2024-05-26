"use client";

import React, { useState, useEffect } from "react";
import styles from "./clientCardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Skeleton from "../card/Skeloton";

const ClientCardList = ({ initialData, page, cat }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const getData = async (page, cat) => {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getData(page, cat);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [page, cat]);


  const { posts, count } = data;
  const POST_PER_PAGE = 2;
  const hasPrev = page > 1;
  const hasNext = page * POST_PER_PAGE < count;



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : ""} Recent Blogs</h1>
      <div className={styles.posts}>
        {loading
          ? Array.from({ length: POST_PER_PAGE }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : posts.map((item) => <Card item={item} key={item.id} />)}
      </div>
      <Pagination totalPages={initialData?.count / 2} cat={cat} page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default ClientCardList;
