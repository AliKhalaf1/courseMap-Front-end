import axios from 'axios';
import configs from '../../../Global/config';
const resetPassword = (token, password) => {
  return axios
    .post(
      `${configs.API_BASE_URL}/auth/reset-password`,
      { password: password.password },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      return response.data;
    });
};

const resetPasswordServices = {
  resetPassword
};
export default resetPasswordServices;
