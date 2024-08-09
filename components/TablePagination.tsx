"use client";

import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
  resultsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setResultsPerPage: (resultsPerPage: number) => void;
}

const TablePagination: React.FC<PaginationProps> = ({
  resultsPerPage,
  currentPage,
  setCurrentPage,
  setResultsPerPage,
}) => {

  return (
    <div className="px-3 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between text-xs sm:text-sm">
      <div className="flex gap-2 w-full justify-between items-center">
        <div className="flex items-center">
          <span>Page {currentPage} |</span>
          <div>
            <label htmlFor="resultsPerPage">Rows per page:</label>
            <select
              id="resultsPerPage"
              value={resultsPerPage}
              onChange={(e) => {
                setCurrentPage(1);
                // @ts-ignore
                setResultsPerPage(e.target.value);
              }}
              className="ml-1 px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center text-gray-700 hover:text-white border border-gray-700 duration-300 ease-in-out hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-1 text-center"
          >
            <IconChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center text-gray-700 hover:text-white border border-gray-700 duration-300 ease-in-out hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-1 text-center"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
