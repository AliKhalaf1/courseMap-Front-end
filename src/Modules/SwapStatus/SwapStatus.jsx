import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import userSwapRequestsServices from '../User/services/userSwapRequests.services';
import Table from 'react-bootstrap/Table';
import globalFunctions from '../../Global/functions';
import Loader from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import swapStatusServices from './Services/swapStatus.services';
import './SwapStatus.scss';
const SwapStatus = () => {
  const [requestsList, setRequestsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  useEffect(() => {
    setLoading(true);
    userSwapRequestsServices.getUserRequests().then((res) => {
      setRequestsList(res);
      setLoading(false);
    });
  }, []);

  const HandleAcceptSwapRequest = (valueId, matchedId) => {
    setLoading(true);
    setMessage('');
    swapStatusServices.acceptSwapRequest(valueId, matchedId).then(
      (res) => {
        setLoading(false);
        setMessage('Successful');
        setSuccessful(true);
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  const HandleDeclineSwapRequest = (valueId, matchedId) => {
    setLoading(true);
    setMessage('');
    swapStatusServices.declineSwapRequest(valueId, matchedId).then(
      (res) => {
        setLoading(false);
        setMessage('Successful');
        setSuccessful(true);
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  const SwapStatusComponent = () => {
    return (
      <div className="swapStatus mt-4">
        <h2>Swap Status</h2>
        <div className="mt-5">
          {requestsList && requestsList.length ? (
            requestsList.map((value, key) => (
              <div className="mt-5" key={key}>
                <h5>Status: {value.status}</h5>
                <Table className="mt-2">
                  <tbody>
                    <tr>
                      <td>{value.course.code}</td>
                      <td>{globalFunctions.dateToString(value.createdAt)}</td>
                      <td>{globalFunctions.timeToString(value.offeredTimeslot)}</td>
                    </tr>
                  </tbody>
                </Table>
                {value.matches && value.matches.length ? (
                  <>
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Matched Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.matches.map((match, matchKey) => (
                          <tr key={matchKey}>
                            <td>{matchKey + 1}</td>
                            <td>{match.matchedUser.name}</td>
                            <td>{match.matchedUser.email}</td>
                            <td>d</td>

                            <td>
                              <Button
                                variant="outline-success"
                                onClick={() => HandleAcceptSwapRequest(value.id,match.id)}
                              >
                                Accept
                              </Button>
                              {'  '}
                              <Button
                                variant="outline-danger"
                                onClick={() => HandleDeclineSwapRequest(match.id)}
                              >
                                Decline
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {message && (
                      <div className="form-group">
                        <div
                          className={successful ? 'alert alert-success' : 'alert alert-danger'}
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <>
            <h4>You have not made any requests... :/</h4>
            <h5>Create a new one from <a href='/swap'>here</a></h5>
            </>
          )}
        </div>
      </div>
    );
  };
  return <Container>{loading ? <Loader /> : <SwapStatusComponent />}</Container>;
};

export default SwapStatus;
