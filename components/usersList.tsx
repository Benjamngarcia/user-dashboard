"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import UserTable from "./usersTable";
import {
  IconChevronLeft,
  IconChevronRight,
  IconAdjustmentsHorizontal,
  IconDownload,
} from "@tabler/icons-react";

const UserList: React.FC = () => {
  const [resultsPerPage, setResultsPerPage] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [filterClass, setFilterClass] = useState<string>(
    "max-h-0 overflow-hidden"
  );

  const { users, loading, error } = useUsers(currentPage, resultsPerPage);

  useEffect(() => {
    const uniqueNationalities = new Set(users.map((user) => user.nat));
    setNationalities(Array.from(uniqueNationalities));
  }, [users]);

  useEffect(() => {
    if (showFilters) {
      setFilterClass(
        "max-h-96 overflow-visible transition-all duration-500 ease-in-out"
      );
    } else {
      setFilterClass(
        "max-h-0 overflow-hidden transition-all duration-500 ease-out"
      );
    }
  }, [showFilters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between gap-2 items-center px-3 py-2 bg-white border border-gray-300 sm:justify-end">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex gap-1 items-center font-medium rounded-lg text-xs sm:text-sm px-2 py-1 text-center text-gray-700 focus:text-white border border-gray-700 duration-300 ease-in-out focus:bg-gray-900 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
          <IconAdjustmentsHorizontal /> {showFilters ? "Hide" : "Show"} Filters
        </button>
        <button
          type="button"
          className="flex items-center text-green-500 hover:text-white border border-green-500 duration-300 ease-in-out hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-1 text-center"
        >
          <IconDownload /> Export as CSV
        </button>
      </div>
      {showFilters && (
        <div
          className={`${filterClass} px-3 py-2 bg-white border border-gray-300 rounded shadow`}
        >
          <h4 className="text-gray-800 font-semibold">Filter Options</h4>
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-2">
            <div className="w-full">
              <label
                htmlFor="gender"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Gender:
              </label>
              <select
                id="gender"
                className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
              >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="nationality"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Nationality:
              </label>
              <select
                id="nationality"
                className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
              >
                <option value="any">Any</option>
                {nationalities.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="age"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Age Range:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  id="age-min"
                  placeholder="Min Age"
                  className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
                <input
                  type="number"
                  id="age-max"
                  placeholder="Max Age"
                  className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <UserTable users={users} />
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
    </div>
  );
};

export default UserList;
