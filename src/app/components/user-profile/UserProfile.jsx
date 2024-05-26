"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial setting of screen width
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "40px",
    height: "40px",
  };

  // Check if user exists
  if (!user) {
    return (
      <div style={containerStyle}>
        <p style={{ fontSize: "12px", alignItems: "center", display: "flex" }}>
          Welcome, <Link href="/login"><span style={{"fontWeight":"bold", padding:"5px"}}>login </span></Link> to write comment
        </p>
      </div>
    );
  }

  // Add media query for screens below 500px width
  if (screenWidth && screenWidth <= 500) {
    containerStyle.paddingRight = "40px";
    containerStyle.paddingLeft = "40px";
  }

  const imageStyle = {
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      <Image
        key={user._id}
        src={user?.image}
        width={20}
        height={20}
        alt={user.name}
        style={imageStyle}
      />
      <h6>Welcome, {user.name}!</h6>
      <button
        onClick={signOut}
        style={{
          backgroundColor: "black",
          color: "#fff",
          width: "70px",
          height: "30px",
          padding: "2px 5px",
          border: "1px solid #fff",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s, box-shadow 0.3s",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
