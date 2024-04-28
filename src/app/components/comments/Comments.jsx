"use client";

import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
    setDesc("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="write a comment..."
            value={desc}
          />
          <button onClick={handleSubmit} className={styles.send}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      {console.log(data, "data")}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item.user.image ? (
                    <Image
                      key={item._id}
                      src={item?.user?.image}
                      width={50}
                      height={50}
                      alt=""
                      className={styles.image}
                    />
                  ) : (
                    ""
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item?.user?.name}</span>
                    <span className={styles.date}>
                      <span className={styles.date}>
                        {new Date(item?.createdAt)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, ".")}
                      </span>
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item?.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
