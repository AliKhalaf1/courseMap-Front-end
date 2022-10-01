import axios from 'axios';
import configs from '../../../Global/config';
import authHeader from '../../../Global/auth-header';

const getUserRequests = () =>
  axios.get(`${configs.API_BASE_URL}/swap-requests`, { headers: authHeader() }).then((response) => {
    return response.data;
  });
const deleteRequest = (reqId) =>
  axios
    .delete(`${configs.API_BASE_URL}/swap-requests/${reqId}`, { headers: authHeader() })
    .then((response) => {
      return response;
    });
export default {
  getUserRequests,
  deleteRequest
};
