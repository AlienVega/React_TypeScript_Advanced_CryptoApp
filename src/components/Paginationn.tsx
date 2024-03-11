import { useContext, useState, useRef } from "react";
import paginationarrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../content/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage, perPage } = useContext(CryptoContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      let val = inputRef.current.value;
      if (val !== "0") {
        setPerPage(val);
        inputRef.current.value = val;
      }
    }
  };
  return (
    <form
      className="relative flex items-center font-nunito mr-12"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        per page
      </label>
      <input
        min={1}
        max={250}
        type="number"
        ref={inputRef}
        name="perpage"
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Paginationn = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);
  const TotalNumber = Math.ceil(totalPages / perPage);
  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };
  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };
  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };
  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
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
          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="outline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button onClick={next} className="outline-0 hover:text-cyan w-8">
              <img
                className="w-full h-auto "
                src={paginationarrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Paginationn;
