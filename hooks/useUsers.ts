import { useState, useEffect } from 'react';
import { fetchUsers } from '@/api/usersService';

export const useUsers = () => {
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };

    loadUsers();
  }, []);

  return { users, loading };
};
