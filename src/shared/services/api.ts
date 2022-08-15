import axios from 'axios';

const user = localStorage.getItem('@Sunize:user');

const sunizeUser = user ? JSON.parse(user) : null;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'sunize-access-token': sunizeUser?.access_token || '',
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('@Sunize:user');
      window.location.href = '/login';
    }
    return error;
  },
);

export const updateJwt = (token: string) => {
  api.interceptors.request.use(config => {
    config!.headers!['sunize-access-token'] = token;
    return config;
  });
};
