import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, totalPages, cat, data }) => {
  const router = useRouter();

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (pageNumber) => {
    router.push(`?page=${pageNumber}${cat ? `&cat=${cat}` : ""}`);
  };

  console.log('data', data);

  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const rangeSize = 5; // Number of page numbers to display
    const currentPage = page;
    const lastPage = totalPages;
    let start = currentPage - Math.floor(rangeSize / 2);
    start = Math.max(start, 1);
    let end = start + rangeSize - 1;
    if (end > lastPage) {
      end = lastPage;
      start = Math.max(end - rangeSize + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    data?.count === 1 ? (
      <div className={styles.noBlogs}>One article has been found.</div>
    ) : (
      <div>
        {totalPages > 0 ? (
          <div className={styles.container}>
            <button
              className={`${styles.button} ${!hasPrev ? styles.disabled : ""}`}
              disabled={!hasPrev}
              onClick={() => goToPage(page - 1)}
            >
              {"<"}
            </button>
            {getPageRange().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`${styles.pageNumber} ${
                  pageNumber === page ? styles.active : ""
                }`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`${styles.button} ${!hasNext ? styles.disabled : ""}`}
              disabled={!hasNext}
              onClick={() => goToPage(page + 1)}
            >
              {">"}
            </button>
          </div>
        ) : (
          <div className={styles.noBlogs}>No blogs were found.</div>
        )}
      </div>
    )
  );
};

export default Pagination;
