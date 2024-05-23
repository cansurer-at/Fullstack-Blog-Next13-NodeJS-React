import React from "react";
import ClientCardList from "./ClientCardList";

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

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);
  return (
    <ClientCardList  initialData={{ posts, count }} page={page} cat={cat} />
  );
};

export default CardList;
