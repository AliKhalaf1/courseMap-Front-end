import axios from 'axios';
import configs from '../../../Global/config';

// user should only be email and password
const login = (user) => {
  return axios.post(`${configs.API_BASE_URL}/auth/login`, user).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', response.data.token);
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout
};
