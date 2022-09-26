import axios from 'axios';
import configs from '../../../Global/config';
export const addUser = (user) =>
  axios.post(`${configs.API_BASE_URL}/auth/register`, user).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', response.data.token);
    }
    return response.data;
  });
