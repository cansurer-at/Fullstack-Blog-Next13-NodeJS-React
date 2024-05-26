import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../auth-links/AuthLinks";
import ThemeToggle from "../theme-toggle/ThemeToggle";

const Navbar = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          webdev again
        </Link>
        <div className={styles.links}>
        

          <ThemeToggle />
          <Link href="/" className={styles.link}>
            Homepage
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <AuthLinks />
        </div>
      </div>
    </>
  );
};

export default Navbar;
