import React from 'react';
import UserSwapRequests from './components/UserSwapRequests/UserSwapRequests';
import UserCourseMap from './components/UserCourseMap/UserCourseMap';
import Container from 'react-bootstrap/Container';
const User = () => {
  return (
    <Container>
      <UserCourseMap />
      <UserSwapRequests />
    </Container>
  );
};

export default User;
