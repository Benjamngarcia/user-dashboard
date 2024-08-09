import { useState, useEffect } from 'react';
import { fetchUser } from '@/api/usersService';

export const useUserDetails = (uuid: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchUser(uuid);
        setUser(fetchedUsers);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    loadUser();
  }, [uuid]);

  return { user, loading, error };
};
