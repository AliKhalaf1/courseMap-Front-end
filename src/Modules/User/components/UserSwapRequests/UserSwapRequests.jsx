import React, { useState, useEffect } from 'react';
import userSwapRequestsServices from '../../services/userSwapRequests.services';
import Table from 'react-bootstrap/Table';
import Loader from '../../../Loader/Loader';
import globalFunctions from '../../../../Global/functions';
import Button from 'react-bootstrap/Button';
const UserSwapRequests = () => {
  const [requestsList, setRequestsList] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    userSwapRequestsServices.getUserRequests().then((res) => {
      setRequestsList(res);
      setLoading(false);
    });
  }, []);

  const HandleDeleteRequest = (reqId) => {
    userSwapRequestsServices.deleteRequest(reqId).then((res) => {
      if (res.status === 200) {
        setRequestsList(requestsList.filter((req) => req.id !== reqId));
      }
    });
  };
  const Requests = () => {
    return (
      <div className="mt-4">
        <h2>Swap Requests</h2>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Creation Date</th>
                <th>Offered Time Slot</th>
                <th>Wanted Time Slot(s)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requestsList.map((value, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{value.course.code + ' - ' + value.course.name}</td>
                  <td>{globalFunctions.dateToString(value.createdAt)}</td>
                  <td>{globalFunctions.timeToString(value.offeredTimeslot)}</td>
                  <td>
                    {value.wantedTimeslots.map((time, wantedTimeslotsKey) => (
                      <p key={wantedTimeslotsKey}>{globalFunctions.timeToString(time)}</p>
                    ))}
                  </td>

                  <td>{value.status}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => HandleDeleteRequest(value.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };
  return <>{loading ? <Loader /> : <Requests />}</>;
};

export default UserSwapRequests;
