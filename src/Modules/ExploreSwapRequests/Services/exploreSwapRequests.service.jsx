import axios from 'axios';
import configs from '../../../Global/config';
import authHeader from '../../../Global/auth-header';

const getAllSwapRequests = (courseId) =>
  axios.get(`${configs.API_BASE_URL}/swap-requests/courses/${courseId}`).then((response) => {
    return response.data;
  });

const exploreSwapRequestsServices = {
  getAllSwapRequests
};
export default exploreSwapRequestsServices;
