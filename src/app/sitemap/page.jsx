import React from "react";
import Link from "next/link";

// Dummy data for demonstration purposes
const categories = [
  { slug: "react", name: "React" },
  { slug: "node-js", name: "Node.js" },
  { slug: "docker", name: "Docker" },
  { slug: "mongo-db", name: "MongoDB" },
  { slug: "sql", name: "SQL" },
  { slug: "css", name: "CSS" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "tech-news", name: "Tech News" },
  { slug: "frontend", name: "Frontend" },
  { slug: "backend", name: "Backend" }
];

const Sitemap = () => {
  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        {/* Add more links as needed */}
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <h2>Categories</h2>
      <ul>
        {/* Map through categories and render them dynamically */}
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;