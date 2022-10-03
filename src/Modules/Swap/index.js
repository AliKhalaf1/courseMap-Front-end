import React from 'react';
import { Container } from 'react-bootstrap';
import AddSwapRequest from './components/AddSwapRequest/AddSwapRequest';
import SwapStatus from './components/SwapStatus/SwapStatus';
const Swap = () => {
  return (
    <Container>
      <AddSwapRequest />
      <SwapStatus />
    </Container>
  );
};

export default Swap;
