import React from 'react';
import UserSwapRequests from './components/UserSwapRequests/UserSwapRequests';
//import UserCourseMap from './components/UserCourseMap/UserCourseMap';
import Container from 'react-bootstrap/Container';
import { Navigate } from 'react-router-dom';
import authHeader from '../../Global/auth-header';
const User = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  if (!loggedIn) return <Navigate to="/" />;
  return (
    <Container>
      <UserSwapRequests />
      {/* <UserCourseMap /> */}
    </Container>
  );
};

export default User;
