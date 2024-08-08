"use client";

import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import {
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
} from "@tabler/icons-react";

const UserList: React.FC = () => {
  const [resultsPerPage, setResultsPerPage] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { users, loading, error } = useUsers(currentPage, resultsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Full name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.login.uuid}
              className="bg-white hover:bg-gray-100 duration-300 ease-in-out"
            >
              <td className="px-5 py-5 border-b border-gray-200 text-sm flex items-center gap-2">
                <img
                  src={user.picture.thumbnail}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                {user.name.first} {user.name.last}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {user.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {user.gender}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {user.location.city}, {user.location.country}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <button
                  type="button"
                  className="flex items-center text-red-500 hover:text-white border border-red-500 duration-300 ease-in-out hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                >
                  <IconTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between text-xs sm:text-sm">
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
                className="px-3 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
              className="flex items-center text-gray-700 hover:text-white border border-gray-700 duration-300 ease-in-out hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
            >
              <IconChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center text-gray-700 hover:text-white border border-gray-700 duration-300 ease-in-out hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
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
