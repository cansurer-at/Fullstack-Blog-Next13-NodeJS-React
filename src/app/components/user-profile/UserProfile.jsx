"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";

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

  if (!user) {
    return <div></div>;
  }

  const containerStyle = {
    display: screenWidth < 1040 ? 'none' : 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const imageStyle = {
    borderRadius: '50%',
    objectFit: 'cover'
  };

  return (
    <div style={containerStyle}>
      <Image
        key={user._id}
        src={user?.image}
        width={50}
        height={50}
        alt={user.name}
        style={imageStyle}
      />
      <h6>Welcome, {user.name}!</h6>
    </div>
  );
};

export default UserProfile;
