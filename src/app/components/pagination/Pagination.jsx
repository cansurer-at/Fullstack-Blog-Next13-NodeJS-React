import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, totalPages, cat }) => {
  const router = useRouter();

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (pageNumber) => {
    router.push(`?page=${pageNumber}${cat ? `&cat=${cat}` : ""}`);
  };

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
    <div>
      {totalPages > 0 ? (
        <div className={styles.container}>
          <button
            className={styles.button}
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
            disabled={!hasNext}
            className={styles.button}
            onClick={() => goToPage(page + 1)}
          >
            {">"}
          </button>
        </div>
      ) : (
        "No blogs were found!"
      )}
    </div>
  );
};

export default Pagination;
