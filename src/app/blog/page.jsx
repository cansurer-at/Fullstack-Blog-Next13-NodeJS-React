import CardList from "../components/card-list/CardList";
import styles from "./blogpage.module.css";
import Menu from "../components/menu/Menu";
import CategoryList from "../components/category-list/CategoryList";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
     <CategoryList />

      <h1  className={styles.title}>{cat} Blog(s)</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat}/>
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default BlogPage;