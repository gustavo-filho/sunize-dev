import axios from 'axios';

const user = localStorage.getItem('@Sunize:user');

const sunizeUser = user ? JSON.parse(user) : null;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'sunize-access-token': sunizeUser?.access_token || '',
  },
});

export const updateJwt = (token: string) => {
  api.defaults.headers.common['sunize-access-token'] = token;
};
