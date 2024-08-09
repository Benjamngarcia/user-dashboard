import { useState, useEffect } from 'react';
import { fetchUsers } from '../api/usersService';

export const useUsers = (page: number, resultsPerPage: number, filters: Filters) => {
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteUser = () => {
    setUsers(users.filter(user => user.login.uuid !== selectedUser?.login.uuid));
    setSelectedUser(null);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchUsers(page, resultsPerPage, filters);
        let filteredUsers = fetchedUsers;

        if (filters.ageMin || filters.ageMax) {
          filteredUsers = filteredUsers.filter(user => {
            const age = user.dob.age;
            const minAge = parseInt(filters.ageMin) || 0;
            const maxAge = parseInt(filters.ageMax) || Number.MAX_SAFE_INTEGER;
            return age >= minAge && age <= maxAge;
          });
        }

        setUsers(filteredUsers);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    loadUsers();
  }, [page, resultsPerPage, JSON.stringify(filters)]);

  return { users, loading, error, deleteUser, setSelectedUser };
};
