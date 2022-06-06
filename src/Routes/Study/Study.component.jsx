import { questions } from "../../Data/testData";
import styles from "./Study.module.scss";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StudyQuestionWrapper from "../../components/StudyQuestionWrapper/StudyQuestionWrapper.component";

function Study({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(questions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.study}>
      <div className={styles.study__questions}>
        <StudyQuestionWrapper
          currentItems={currentItems}
          totalQuestions={questions.length}
        />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
}

export default Study;
