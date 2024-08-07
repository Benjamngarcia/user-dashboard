"use client"

import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

const UserList: React.FC = () => {
  const resultsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const { users, loading, error } = useUsers(currentPage, resultsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <div className="">
        {users.map(user => (
          <div key={user.login.uuid} className="">
            <img src={user.picture.large} alt={user.name.first} className="" />
            <div className="">
              <h2 className="">{user.name.first} {user.name.last}</h2>
              <p className="">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;