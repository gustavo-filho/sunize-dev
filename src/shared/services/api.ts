import axios from 'axios';
import Cookies from 'js-cookie';

const user: string | undefined = Cookies.get('@Sunize:user');

const sunizeUser = user ? JSON.parse(user) : null;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'sunize-access-token': sunizeUser,
  },
});

export const updateJwt = (token: string) => {
  api.defaults.headers.common['sunize-access-token'] = token;
};
