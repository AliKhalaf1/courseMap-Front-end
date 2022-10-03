import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddSwapRequest from './components/AddSwapRequest/AddSwapRequest';
import SwapStatus from './components/SwapStatus/SwapStatus';
import Loader from '../Loader/Loader';
const Swap = () => {
  const [loading, setLoading] = useState(false);
  const [numberOfAddedRequests, setNumberOfAddedRequests] = useState(0);
  return (
    <Container>
      {loading ? <Loader /> : <></>}
      <AddSwapRequest
        loading={loading}
        setLoading={setLoading}
        setNumberOfAddedRequests={setNumberOfAddedRequests}
        numberOfAddedRequests={numberOfAddedRequests}
      />
      <SwapStatus
        loading={loading}
        setLoading={setLoading}
        numberOfAddedRequests={numberOfAddedRequests}
      />
    </Container>
  );
};

export default Swap;
