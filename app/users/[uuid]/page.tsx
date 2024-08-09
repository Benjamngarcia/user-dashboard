"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useUser } from "../../../context/userContext";

export default function UserDetailsPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/");
  };

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <button
          onClick={handleBackToDashboard}
          className="py-2 px-4 mb-4 font-medium rounded-lg text-xs sm:text-sm text-center text-gray-700 focus:text-white border border-gray-700 duration-300 ease-in-out focus:bg-gray-900 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 flex items-center gap-1"
        >
          <IconArrowNarrowLeft stroke={1} />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold mb-6">User Details</h1>

        <div className="flex flex-col md:flex-row md:items-center">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-32 h-32 rounded-full mx-auto md:mx-0 md:mr-6"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="text-xl font-semibold">
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.gender}</p>
            <p className="text-gray-600">
              {user.location.street.name}, {user.location.street.number}
            </p>
            <p className="text-gray-600">
              {user.location.city}, {user.location.state},{" "}
              {user.location.country}
            </p>
            <p className="text-gray-600">Postcode: {user.location.postcode}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Other Details</h3>
          <p className="text-gray-600">
            Date of Birth: {new Date(user.dob.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Age: {user.dob.age}</p>
          <p className="text-gray-600">Phone: {user.phone}</p>
          <p className="text-gray-600">Cell: {user.cell}</p>
          <p className="text-gray-600">
            Registered: {new Date(user.registered.date).toLocaleDateString()}{" "}
            (Registered since: {user.registered.age} years ago)
          </p>
        </div>
      </div>
    </div>
  );
}
