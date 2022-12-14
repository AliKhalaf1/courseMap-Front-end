import axios from 'axios';
import configs from '../../../Global/config';
import authHeader from '../../../Global/auth-header';

const getCoursesQuery = (query) =>
  axios.get(`${configs.API_BASE_URL}/courses/search/${query}`).then((response) => {
    return response.data;
  });
const getTimesOfCourse = (courseCode) =>
  axios
    .get(
      `${configs.API_BASE_URL}/courses/${courseCode}/semesters/${configs.CURRENT_SEMESTER}/timeslots`
    )
    .then((response) => {
      return response.data;
    });

const postSwapRequest = (wantedTimeslots, offeredTimeslot) =>
  axios
    .post(
      `${configs.API_BASE_URL}/swap-requests`,
      { wantedTimeslots, offeredTimeslot },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
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

const swapServices = {
  getCoursesQuery,
  getTimesOfCourse,
  postSwapRequest,
  acceptSwapRequest,
  declineSwapRequest
};
export default swapServices;
