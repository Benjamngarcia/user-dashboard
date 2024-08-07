import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';
const CACHE_DURATION = 60000;

let cachedData: Users | null = null;
let cacheTimestamp: number | null = null;

export const fetchUsers = async (count: number = 30): Promise<Users> => {
  const now = Date.now();

  if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return cachedData;
  }

  const response = await axios.get(`${API_URL}?results=${count}`);
  cachedData = response.data.results;
  cacheTimestamp = now;

  return cachedData || [];
};
