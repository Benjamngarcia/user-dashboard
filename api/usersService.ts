import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';
const CACHE_DURATION = 60000;

let cacheData: { [key: string]: { timestamp: number; data: Users } } = {};

export const fetchUsers = async (page: number = 1, resultsPerPage: number = 30): Promise<Users> => {
  const now = Date.now();
  const cacheKey = `page_${page}_count_${resultsPerPage}`;

  if (cacheData[cacheKey] && now - cacheData[cacheKey].timestamp < CACHE_DURATION) {
    return cacheData[cacheKey].data;
  }

  const response = await axios.get(`${API_URL}?page=${page}&results=${resultsPerPage}&seed=abc`);
  const fetchedData = response.data.results;

  cacheData[cacheKey] = {
    timestamp: now,
    data: fetchedData,
  };

  return fetchedData || [];
};
