"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import UserTable from "./TableList";
import { IconAdjustmentsHorizontal, IconDownload } from "@tabler/icons-react";
import TablePagination from "./TablePagination";
import { downloadCSV } from "../helpers/exportCSV";
import ConfirmationDelete from "./Modals/ConfirmationDelete";
import Loader from "./Loader";

const filterStatic = {
  gender: "",
  nationality: "",
  ageMin: "",
  ageMax: "",
};

const UserList: React.FC = () => {
  const [resultsPerPage, setResultsPerPage] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [filterClass, setFilterClass] = useState<string>(
    "max-h-0 overflow-hidden"
  );
  const [genderFilter, setGenderFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [ageMinFilter, setAgeMinFilter] = useState("");
  const [ageMaxFilter, setAgeMaxFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState(filterStatic);
  const [modalOpen, setModalOpen] = useState(false);

  const { users, loading, error, deleteUser, setSelectedUser } = useUsers(
    currentPage,
    resultsPerPage,
    activeFilters
  );

  const applyFilters = () => {
    setActiveFilters({
      gender: genderFilter,
      nationality: nationalityFilter,
      ageMin: ageMinFilter,
      ageMax: ageMaxFilter,
    });
  };

  const resetFilters = () => {
    setGenderFilter("");
    setNationalityFilter("");
    setAgeMinFilter("");
    setAgeMaxFilter("");
    setActiveFilters(filterStatic);
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeleteUser = () => {
    deleteUser();
    setModalOpen(false);
  };

  useEffect(() => {
    const uniqueNationalities = new Set(users.map((user) => user.nat));
    setNationalities(Array.from(uniqueNationalities));
  }, [users]);

  useEffect(() => {
    setFilterClass(
      showFilters
        ? "max-h-96 overflow-visible transition-all duration-500 ease-in-out"
        : "max-h-0 overflow-hidden transition-all duration-500 ease-out"
    );
  }, [showFilters]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ConfirmationDelete
        message="Are you sure you want to delete this user?"
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteUser}
        isOpen={modalOpen}
      />
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
          onClick={() => downloadCSV(users)}
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
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
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
                value={nationalityFilter}
                onChange={(e) => setNationalityFilter(e.target.value)}
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
                  value={ageMinFilter}
                  onChange={(e) => setAgeMinFilter(e.target.value)}
                  className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
                <input
                  type="number"
                  id="age-max"
                  placeholder="Max Age"
                  value={ageMaxFilter}
                  onChange={(e) => setAgeMaxFilter(e.target.value)}
                  className="px-2 py-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 w-full md:flex-row">
              <button
                onClick={applyFilters}
                className="flex justify-center font-medium rounded-lg text-xs sm:text-sm px-2 py-2 text-center text-gray-700 focus:text-white border border-gray-700 duration-300 ease-in-out focus:bg-gray-900 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="flex justify-center font-medium rounded-lg text-xs sm:text-sm px-2 py-2 text-center text-red-500 focus:text-white border border-red-500 duration-300 ease-in-out focus:bg-red-900 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
      <UserTable users={users} openModal={handleOpenModal} />
      <TablePagination
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setResultsPerPage={setResultsPerPage}
      />
    </div>
  );
};

export default UserList;
