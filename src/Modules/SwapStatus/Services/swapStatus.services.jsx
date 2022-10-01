import axios from 'axios';
import configs from '../../../Global/config';
import authHeader from '../../../Global/auth-header';

const acceptSwapRequest = (valueId, matchedId) =>
  axios
    .post(
      `${configs.API_BASE_URL}/swap-requests/${valueId}/agree`,
      { matchedSwapRequestId: matchedId },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });

const declineSwapRequest = (valueId, matchedId) =>
  axios
    .post(
      `${configs.API_BASE_URL}/swap-requests/${valueId}/disagree`,
      { matchedSwapRequestId: matchedId },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });

const swapStatusServices = {
  acceptSwapRequest,
  declineSwapRequest
};
export default swapStatusServices;
