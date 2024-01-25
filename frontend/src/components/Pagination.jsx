import React from "react";
import usePagination from "../hooks/usePagination";
import { Button, IconButton, List, ListItem, TextField } from "@mui/material";
import classnames from "classnames";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-icons/ArrowForwardIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
const DOTS = `...`;
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  // const [currentPage, setCurrentPage] = React.useState(1);

  console.log(currentPage, "currentPage");
  console.log(totalCount, "totalCount");
  console.log(pageSize, "pageSize");

  // /--------------------------------------------------------
  // /--------------------------------------------------------
  // /--------------------------------------------------------

  // const totalCount = 100
  // const pageSize = 10;
  // const siblingCount = 1;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const onFirstPage = () => {
    onPageChange(1);
  };
  const onLastPage = () => {
    onPageChange(lastPage);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  console.log(paginationRange, "paginationRange paginationRange");

  return (
    <List
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      {/* // first page */}

      <IconButton onClick={onFirstPage}>
        <FirstPageIcon />
      </IconButton>
      {/* <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li> */}

      <IconButton
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ChevronLeftIcon />
      </IconButton>

      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      {/* <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li> */}

      <IconButton
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ChevronRightIcon />
      </IconButton>

      <IconButton onClick={onLastPage}>
        <LastPageIcon />
      </IconButton>
    </List>
  );
};

// /--------------------------------------------------------
// /--------------------------------------------------------
// /--------------------------------------------------------

// const handlePagination = (pageNumber) => {
//   onPageChange(pageNumber);
// };

//   return (
//     <div>
//       {/* {posts.map((data, index) => (
//         <div className="list" key={index}>
//           <p>{data.title}</p>
//         </div>
//       ))} */}

//       <Button onClick={onPrevious} disabled={currentPage === 1}>
//         prev
//       </Button>
//       {paginationRange.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           // style={{ background: "skyblue", color: "red" }}
//           className={currentPage === pageNumber ? "active" : ""}
//           // style={currentPage === pageNumber ? styles.active : ""}
//           onClick={() => handlePagination(pageNumber)}
//         >
//           {pageNumber}
//         </button>
//       ))}
//       <Button onClick={onNext}>next</Button>
//     </div>
//   );
// };

export default Pagination;
