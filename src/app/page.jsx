// Home.js
import React from "react";
import styles from "./homepage.module.css";
import CategoryList from "./components/category-list/CategoryList";
import CardList from "./components/card-list/CardList";
import Menu from "./components/menu/Menu";
import CookieConsentComponent from "../app/components/cookie/CookieConsentComponent";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const defaultLanguage = "en"; 

  return (
    <>
      <CategoryList />

    <div className={styles.container}>
      <CookieConsentComponent defaultLanguage={defaultLanguage} />

      <div className={styles.content}>

        <CardList page={page} />
        {/* <Menu /> */}
      </div>
    </div>
    </>

  );
}
