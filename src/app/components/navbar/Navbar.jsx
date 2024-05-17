import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../auth-links/AuthLinks";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import UserProfile from "../user-profile/UserProfile"


const Navbar = () => {
  return (
    <>
    <div className={styles.container}>
     
      <UserProfile/>
      <Link href="/" className={styles.logo}>webdev again</Link>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>Homepage</Link>
        <Link href="/" className={styles.link}>Contact</Link>
        <Link href="/" className={styles.link}>About</Link>
        <AuthLinks />
      </div>
    </div>
    </>
  );
};

export default Navbar;