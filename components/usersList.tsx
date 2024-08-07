"use client"

import React from 'react';
import { useUsers } from '../hooks/useUsers';

const UserList: React.FC = () => {
  const { users, loading } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

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
