import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import swapServices from '../Swap/Services/swap.services';
import authHeader from '../../Global/auth-header';
import Table from 'react-bootstrap/Table';
import exploreSwapRequestsServices from './Services/exploreSwapRequests.service';
import Loader from '../Loader/Loader';
import globalFunctions from '../../Global/functions';
const ExploreSwapRequests = () => {
  const [loading, setLoading] = useState(false);
  //data for picking subject
  const [filteredData, setFilteredData] = useState([]);
  const [subjectWordEntered, setSubjectWordEntered] = useState('');
  const [listOfRequests, setlistOfRequests] = useState();

  const handlePickingSubject = (value) => {
    setLoading(true);
    setFilteredData([]);
    setSubjectWordEntered(value.name);
    exploreSwapRequestsServices.getAllSwapRequests(value.code).then((response) => {
        console.log(response)
        setLoading(false)
        setlistOfRequests(response)
      });
  };

  const handleQuery = (event) => {
    const searchWord = event.target.value;
    setSubjectWordEntered(searchWord);
    swapServices.getCoursesQuery(searchWord).then((response) => {
      setFilteredData(response);
    });
  };
  
  return (
    <Container>
      <div className="input_group">
        <InputGroup size="sm">
          <InputGroup.Text>Course</InputGroup.Text>
          <Form.Control value={subjectWordEntered} onChange={handleQuery} className="formControl" />
        </InputGroup>
        {filteredData.length !== 0 && (
          <div className="queryResult">
            {filteredData.map((value, key) => (
              <div key={key} className="dataItem" onClick={() => handlePickingSubject(value)}>
                <p>{value.name} </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {loading ? <Loader /> : 
      <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
            <tr>
                <th>#</th>
                <th>User</th>
                 <th>Created at</th>
                <th>Offered Time Slot</th>
                <th>Wanted Time Slots</th>
                <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listOfRequests && (listOfRequests.map((value, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{value.user}</td>
                <td>{globalFunctions.dateToString(value.createdAt)}</td>
                <td>{globalFunctions.timeToString(value.offeredTimeslot)}</td>
                <td>
                  {value.wantedTimeslots.map((time, wantedTimeslotsKey) => (
                    <p key={wantedTimeslotsKey}>{globalFunctions.timeToString(time)}</p>
                  ))}
                </td>

                <td>{value.status}</td>
              </tr>
            )))}
          </tbody>
      </Table>
      }
    </Container>
  );
};

export default ExploreSwapRequests;
