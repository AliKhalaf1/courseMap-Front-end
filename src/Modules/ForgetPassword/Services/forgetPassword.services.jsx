import axios from 'axios';
import configs from '../../../Global/config';
const forgetPassword = (email) => {
  return axios.post(`${configs.API_BASE_URL}/auth/forgot-password`, email).then((response) => {
    return response.data;
  });
};


const forgetPasswordservices = {
    forgetPassword
};
export default forgetPasswordservices;
