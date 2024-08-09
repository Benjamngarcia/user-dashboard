import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';
const CACHE_DURATION = 60000;

let cacheData: { [key: string]: { timestamp: number; data: Users } } = {};
let cacheUser: { [key: string]: { timestamp: number; data: User } } = {};

export const fetchUsers = async (page: number = 1, resultsPerPage: number = 3, filters: Filters): Promise<Users> => {
  const now = Date.now();
  const cacheKey = `page_${page}_count_${resultsPerPage}_${JSON.stringify(filters)}`;

  if (cacheData[cacheKey] && now - cacheData[cacheKey].timestamp < CACHE_DURATION) {
    return cacheData[cacheKey].data;
  }

  const response = await axios.get(`${API_URL}?page=${page}&results=${resultsPerPage}&gender=${filters.gender}&nat=${filters.nationality}`);
  const fetchedData = response.data.results;

  cacheData[cacheKey] = {
    timestamp: now,
    data: fetchedData,
  };

  return fetchedData || [];
};

export const fetchUser = async (uuid: string): Promise<User> => {
  const now = Date.now();
  const cacheKey = `user_${uuid}`;

  if(cacheUser[cacheKey] && now - cacheUser[cacheKey].timestamp < CACHE_DURATION) {
    return cacheUser[cacheKey].data;
  }

  const response = await axios.get(`${API_URL}?seed=${uuid}&results=1`);
  const fetchedData = response.data.results[0];

  cacheUser[cacheKey] = {
    timestamp: now,
    data: fetchedData,
  };

  return fetchedData || {};
};