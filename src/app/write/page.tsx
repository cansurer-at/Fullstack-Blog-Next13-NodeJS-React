"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./writepage.module.css";
import dynamic from "next/dynamic"; // Dynamic import for ReactQuill
import { useRouter } from "next/navigation"; // Corrected import
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/firebase";
import { useSession } from "next-auth/react";

import "react-quill/dist/quill.bubble.css";

// Ensure ReactQuill is only imported on the client-side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [newCat, setNewCat] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories. Status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  

  useEffect(() => {
    if (typeof window !== "undefined" && file) {
      const storage = getStorage(app);
      const upload = () => {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Upload error:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
            });
          }
        );
      };

      upload();
    }
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlugs: selectedCategories,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  }

  const handleCreateCategory = async () => {
    try {
      const slug = newCat.toLowerCase().replace(/\s+/g, "-");

      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: newCat,
          slug: slug,
        }),
      });
      if (res.status === 201) {
        console.log("Category created successfully!");
        setCategories((prevCategories) => [
          ...prevCategories,
          { name: newCat, slug: slug },
        ]);
        setNewCat("");
      } else {
        console.error("Failed to create category. Status:", res.status);
        const data = await res.json();
        console.error("Error message:", data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Category"
        value={newCat}
        onChange={(e) => setNewCat(e.target.value)}
        className={styles.newCatInput}
      />
      <button className={styles.addButton} onClick={handleCreateCategory}>
        Create Category
      </button>
      <select
        className={styles.selectNew}
        multiple
        value={selectedCategories}
        onChange={(e) =>
          setSelectedCategories(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
      >
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.slug}
          </option>
        ))}
      </select>

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
