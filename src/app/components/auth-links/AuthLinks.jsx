"use client"
import Link from "next/link";
import styles from "./authLinks.module.css";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const AuthLinks = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
            <Link href="/write" className={styles.link}>
              Write
            </Link>
          )}
         
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <Link onClick={() => setOpen(!open)} href="/login">
              Login
            </Link>
          ) : (
            <>
              {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link href="/write">Write</Link>
              )}
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
