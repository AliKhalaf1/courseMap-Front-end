import axios from 'axios';
import configs from '../../../Global/config';
import authHeader from '../../../Global/auth-header';

const acceptSwapRequest = (id) =>
  axios
    .post(`${configs.API_BASE_URL}/swap-requests/${id}/agree`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });

const declineSwapRequest = (id) =>
  axios
    .post(`${configs.API_BASE_URL}/swap-requests/${id}/disagree`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
export default {
  acceptSwapRequest,
  declineSwapRequest
};
