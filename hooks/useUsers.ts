import { useState, useEffect } from 'react';
import { fetchUsers } from '@/api/usersService';

export const useUsers = (page: number, resultsPerPage: number) => {
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchUsers(page, resultsPerPage);
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    loadUsers();
  }, [page, resultsPerPage]);

  return { users, loading, error };
};
