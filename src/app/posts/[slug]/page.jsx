import React from "react";
import styles from "./singlepage.module.css";
import Image from "next/image";
import Comments from "../../components/comments/Comments";
import CategoryList from "../../components/category-list/CategoryList";
import Footer from "../../components/footer/Footer";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <>
      <CategoryList />
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.user}>
              {data?.user && (
                <>
                  {data.user.image && (
                    <div className={styles.userImageContainer}>
                      <Image
                        src={data.user.image}
                        alt=""
                        fill
                        className={styles.avatar}
                      />
                    </div>
                  )}
                  <div className={styles.userTextContainer}>
                    <span className={styles.username}>{data?.user.name}</span>
                    <span className={styles.date}>
                      {new Date(data?.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, ".")}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          {data?.img && (
            <div className={styles.imageContainer}>
              <Image src={data.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div className={styles.description}>
              {data?.desc ? (
                <div className='ql-editor' dangerouslySetInnerHTML={{ __html: data.desc }}/> 
              ) : (
                <p>No description available.</p>
              )}
            </div>
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
