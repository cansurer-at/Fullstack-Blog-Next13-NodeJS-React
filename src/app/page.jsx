import styles from "./homepage.module.css";
import CategoryList from "./components/category-list/CategoryList";
import CardList from "./components/card-list/CardList";
import Menu from "./components/menu/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
    {/* featured */} 
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu />
      </div>
    </div>
  );
}