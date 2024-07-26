import axios from 'axios';
import PROD from '@/consts/environment';

const baseURL = PROD ? 'https://logoipsum-2a5d3c57950f.herokuapp.com/' : 'http://localhost:3001/';

const ApiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

ApiService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

export default ApiService;
