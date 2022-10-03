import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import swapServices from '../Swap/Services/swap.services';
import Table from 'react-bootstrap/Table';
import exploreSwapRequestsServices from './Services/exploreSwapRequests.service';
import Loader from '../Loader/Loader';
import globalFunctions from '../../Global/functions';
import './ExploreSwapRequests.scss';
const ExploreSwapRequests = () => {
  const [loading, setLoading] = useState(false);
  //data for picking subject
  const [filteredData, setFilteredData] = useState([]);
  const [subjectWordEntered, setSubjectWordEntered] = useState('');
  const [listOfRequests, setlistOfRequests] = useState();
  const [subjectPicked, setSubjectPicked] = useState();
  const handlePickingSubject = (value) => {
    setLoading(true);
    setFilteredData([]);
    setSubjectWordEntered(value.name);
    setSubjectPicked(value);
    exploreSwapRequestsServices.getAllSwapRequests(value.code).then((response) => {
      setLoading(false);
      setlistOfRequests(response);
    });
  };

  const handleQuery = (event) => {
    const searchWord = event.target.value;
    setLoading(true);
    setSubjectWordEntered(searchWord);
    swapServices.getCoursesQuery(searchWord).then((response) => {
      setFilteredData(response);
      setLoading(false);
    });
  };

  return (
    <Container id="explore">
      <div className="input_group">
        <h4>Select a subject :D</h4>
        <InputGroup size="sm" className="mt-3">
          <InputGroup.Text>Course</InputGroup.Text>
          <Form.Control value={subjectWordEntered} onChange={handleQuery} className="formControl" />
        </InputGroup>
        {filteredData.length !== 0 && (
          <div className="queryResult">
            {filteredData.map((value, key) => (
              <div key={key} className="dataItem" onClick={() => handlePickingSubject(value)}>
                <p>{value.code + ' - ' + value.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {subjectPicked ? (
            <div>
              {listOfRequests && listOfRequests.length ? (
                <div className="table-responsive">
                  <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Created at</th>
                        <th>Offered Time Slot</th>
                        <th>Wanted Time Slot(s)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfRequests.map((value, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{value.user.name}</td>
                          <td>{value.user.email}</td>
                          <td>{globalFunctions.dateToString(value.createdAt)}</td>
                          <td>{globalFunctions.timeToString(value.offeredTimeslot)}</td>
                          <td>
                            {value.wantedTimeslots.map((time, wantedTimeslotsKey) => (
                              <p key={wantedTimeslotsKey}>{globalFunctions.timeToString(time)}</p>
                            ))}
                          </td>

                          <td>{value.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <h2>No swap requests available</h2>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </Container>
  );
};

export default ExploreSwapRequests;
