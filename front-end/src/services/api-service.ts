import axios from 'axios';
// import PROD from '@/consts/environment';

const baseURL = 'https://logoipsum-backend.onrender.com/';

const ApiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

ApiService.interceptors.request.use(
  async (config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { state: { token } } = JSON.parse(storedUser);
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
);

export default ApiService;
