"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./authlinks.module.css";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const AuthLinks = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

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

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 670);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ zIndex: 1 }}>
      {status === "unauthenticated" && isWideScreen ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {isWideScreen &&
            user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Link href="/write" className={styles.link}>
                Write
              </Link>
            )}
        </>
      )}
      {!open && (
        <div className={styles.burger} onClick={() => setOpen(!open)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      )}
      {open && (
        <div onClick={() => setOpen(false)}>
          <span style={{ cursor: "pointer", fontSize: 24 }}>X</span>
        </div>
      )}

      {open && (
        <div className={styles.responsiveMenu}>
          <Link style={{ marginTop: "200px" }} href="/">
            Homepage
          </Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <Link onClick={() => setOpen(!open)} href="/login">
              Login
            </Link>
          ) : (
            <>
              {isWideScreen &&
                user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                  <Link href="/write">Write</Link>
                )}
              <span onClick={()=> signOut()} className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthLinks;
