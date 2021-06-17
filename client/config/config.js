import axios from 'axios';
import { getSession } from 'next-auth/client';

const BASE_URL = 'http://localhost:4000/';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(async config => {
  const session = await getSession();

  config.headers.Authorization = `Bearer ${session?.accessToken}`;

  return config;
});

export default axios;
