//import { questions as data } from "../../Data/testData";
import styles from "./Study.module.scss";
import Spinner from "../../components/ui/Spinner/Spinner.component";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StudyQuestionWrapper from "../../components/StudyQuestionWrapper/StudyQuestionWrapper.component";
import { addQuestionsToDB, getQuestions } from "../../firebase/firebase";

function Study({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [questions, setQuestions] = useState(null);

  ///// For import data to DB only  /////

  /*   useEffect(() => {
    async function addToDB() {
      await addQuestionsToDB(data);
    }

    addToDB();
  }, []); */

  ////////////////////////////////////////

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  useEffect(() => {
    if (!questions) return;
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(questions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, questions]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    setItemOffset(newOffset);
  };

  return !questions ? (
    <Spinner />
  ) : (
    <div className={styles.study}>
      <div className={styles.study__questions}>
        <StudyQuestionWrapper
          currentItems={currentItems}
          totalQuestions={questions?.length}
        />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
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
