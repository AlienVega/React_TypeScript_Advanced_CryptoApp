import { useState } from "react";
import paginationarrow from "../assets/pagination-arrow.svg";

const Paginationn = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const TotalNumber = 250;
  const next = () => {
    if (currentPage === TotalNumber) {
      return null;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const prev = () => {
    if (currentPage === 1) {
      return null;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button onClick={prev} className="outline-0 hover:text-cyan w-8">
            <img
              className="w-full h-auto rotate-180"
              src={paginationarrow}
              alt="left"
            />
          </button>
        </li>
        <li>
          <button className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg">
            ...
          </button>
        </li>
        <li>
          <button
            onClick={prev}
            className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {currentPage - 1}
          </button>
        </li>
        <li>
          <button
            disabled
            className="outline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
          >
            {currentPage}
          </button>
        </li>
        <li>
          <button
            onClick={next}
            className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {currentPage + 1}
          </button>
        </li>
        <li>
          <button className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg">
            ...
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage(TotalNumber)}
            className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {TotalNumber}
          </button>
        </li>
        <li>
          <button onClick={next} className="outline-0 hover:text-cyan w-8">
            <img className="w-full h-auto " src={paginationarrow} alt="right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginationn;
