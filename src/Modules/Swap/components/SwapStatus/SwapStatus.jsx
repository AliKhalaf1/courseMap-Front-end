import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import userSwapRequestsServices from '../../../User/services/userSwapRequests.services';
import Table from 'react-bootstrap/Table';
import globalFunctions from '../../../../Global/functions';
import Loader from '../../../Loader/Loader';
import Button from 'react-bootstrap/Button';
import swapServices from '../../Services/swap.services';
import './SwapStatus.scss';
const SwapStatus = (props) => {
  const [requestsList, setRequestsList] = useState(null);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [renderingList, setRenderingList] = useState(false);
  useEffect(() => {
    props.setLoading(true);
    setRenderingList(true);
    userSwapRequestsServices.getUserRequests().then((res) => {
      setRequestsList(res);
      props.setLoading(false);
      setRenderingList(false);
    });
  }, [props.numberOfAddedRequests, successful]);
  const HandleDeleteRequest = (reqId) => {
    userSwapRequestsServices.deleteRequest(reqId).then((res) => {
      if (res.status === 200) {
        setRequestsList(requestsList.filter((req) => req.id !== reqId));
      }
    });
  };
  const HandleAcceptSwapRequest = (valueId, matchedId) => {
    props.setLoading(true);
    setMessage('');
    swapServices.acceptSwapRequest(valueId, matchedId).then(
      (res) => {
        props.setLoading(false);
        setMessage('Successful');
        setSuccessful(true);
      },
      (error) => {
        props.setLoading(false);
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
    props.setLoading(true);
    setMessage('');
    swapServices.declineSwapRequest(valueId, matchedId).then(
      (res) => {
        props.setLoading(false);
        setMessage('Successful');
        setSuccessful(true);
      },
      (error) => {
        props.setLoading(false);
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
          {requestsList && requestsList.length ? (
            requestsList.map((value, key) => (
              <div className="mt-5" key={key}>
                <h5>Status: {value.status}</h5>
                <Table className="mt-2">
                  <tbody>
                    <tr>
                      <td>{value.course.code + ' - ' + value.course.name}</td>
                      <td>{globalFunctions.dateToString(value.createdAt)}</td>
                      <td>{globalFunctions.timeToString(value.offeredTimeslot)}</td>
                      <td>
                    {value.wantedTimeslots.map((time, wantedTimeslotsKey) => (
                      <p key={wantedTimeslotsKey}>{globalFunctions.timeToString(time)}</p>
                    ))}
                  </td>
                      <td><Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => HandleDeleteRequest(value.id)}
                    >
                      Delete
                    </Button></td>
                    </tr>
                  </tbody>
                </Table>
                {value.matches && value.matches.length ? (
                  <div className="table-responsive">
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Time they are offering</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.matches.map((match, matchKey) => (
                          <tr key={matchKey}>
                            <td>{matchKey + 1}</td>
                            <td>{match.matchedUser.name}</td>
                            <td>{match.matchedUser.email}</td>
                            <td>{globalFunctions.timeToString(match.matchedTimeslots.offered)}</td>

                            {match.status === 'agreed' || (
                              <td>
                                <Button
                                  variant="outline-success"
                                  onClick={() => HandleAcceptSwapRequest(value.id, match.id)}
                                >
                                  Done
                                </Button>
                                {'  '}
                                <Button
                                  variant="outline-danger"
                                  onClick={() => HandleDeclineSwapRequest(match.id)}
                                >
                                  Find another match
                                </Button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <>
              <h4>You have not made any requests... :/</h4>
              <h5>Create a new one</h5>
            </>
          )}
        </div>
      </div>
    );
  };
  return <Container>{renderingList ? <Loader /> : <SwapStatusComponent />}</Container>;
};

export default SwapStatus;
