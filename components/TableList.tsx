"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconTrash,
  IconAt,
  IconMapPin,
  IconBlendMode,
  IconPlaystationCircle,
} from "@tabler/icons-react";

interface TableProps {
  users: Users;
  openModal: (user: User) => void;
}

const UserTable: React.FC<TableProps> = ({ users, openModal }) => {
  const router = useRouter();

  const handleLink = (uuid: string) => {
    router.push(`/users/${uuid}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Full name
            </th>
            <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <IconAt stroke={1} size={20} /> Email
              </div>
            </th>
            <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <IconBlendMode stroke={1} size={20} />
                Gender
              </div>
            </th>
            <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <IconMapPin stroke={1} size={20} />
                Location
              </div>
            </th>
            <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <IconPlaystationCircle stroke={1} size={20} />
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.login.uuid}
              className="bg-white hover:bg-gray-100 duration-300 ease-in-out"
              onClick={() => handleLink(user.login.uuid)}
            >
              <td className="px-3 py-3 border-b border-gray-200 text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={user.picture.thumbnail}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />
                  {user.name.first} {user.name.last}
                </div>
              </td>
              <td className="px-3 py-3 border-b border-gray-200 text-xs underline">
                {user.email}
              </td>
              <td className="px-3 py-3 border-b border-gray-200 text-xs">
                {user.gender}
              </td>
              <td className="px-3 py-3 border-b border-gray-200 text-xs">
                {user.location.city}, {user.location.country}
              </td>
              <td className="px-3 py-3 border-b border-gray-200 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(user);
                  }}
                  className="flex items-center text-red-500 hover:text-white border border-red-500 duration-300 ease-in-out hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-1 text-center"
                >
                  <IconTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
