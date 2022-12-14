import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import swapServices from '../../Services/swap.services';
import authHeader from '../../../../Global/auth-header';
import Table from 'react-bootstrap/Table';
import { Navigate } from 'react-router-dom';
import { BsXLg } from 'react-icons/bs';
import './AddSwapRequest.scss';

const AddSwapRequest = (props) => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  //data for picking subject
  const [filteredData, setFilteredData] = useState([]);
  const [subjectWordEntered, setSubjectWordEntered] = useState('');
  const [subjectPicked, setSubjectPicked] = useState();

  //data for available times
  const [availableTimes, setAvailableTimes] = useState([]);

  //data for picking wanted time
  const [offeredTimePicked, setOfferedTimePicked] = useState();
  const [offeredTimePickedId, setOfferedTimePickedId] = useState('');

  //data for picking wanted time
  //const [wantedTimeWordEntered, setWantedTimeWordEntered] = useState('');
  const [wantedTimePicked, setWantedTimePicked] = useState([]);

  const handlePickingSubject = (value) => {
    setFilteredData([]);
    setSubjectPicked(value);
    setSubjectWordEntered(value.name);
    setOfferedTimePickedId();
    setOfferedTimePicked();
    setWantedTimePicked();
    props.setLoading(true);
    //setWantedTimeWordEntered('');
    swapServices.getTimesOfCourse(value.code).then((response) => {
      setAvailableTimes(response);
      props.setLoading(false);
    });
  };

  const handleQuery = (event) => {
    const searchWord = event.target.value;
    props.setLoading(true);
    setSubjectWordEntered(searchWord);
    swapServices.getCoursesQuery(searchWord).then((response) => {
      setFilteredData(response);
      props.setLoading(false);
    });
  };

  const handlePickingOfferedTime = (value) => {
    setOfferedTimePickedId(value.id);
    setOfferedTimePicked(value);
  };
  const handlePickingWantedTime = (value) => {
    wantedTimePicked
      ? setWantedTimePicked([...wantedTimePicked, value])
      : setWantedTimePicked([value]);
  };

  const HandleDeleteWantedRequestsFromTable = (valueId) => {
    setWantedTimePicked(wantedTimePicked.filter((time) => time.id !== valueId));
  };

  const HandleSubmitRequest = () => {
    if (!offeredTimePickedId || wantedTimePicked.length <= 0 || !subjectPicked) {
      setSuccessful(false);
      setMessage('You didnt finish your request :(');
    } else {
      props.setLoading(true);
      let wantedTimePickedIds = [];
      wantedTimePicked.forEach((wantedTime) => {
        wantedTimePickedIds.push(wantedTime.id);
      });

      swapServices.postSwapRequest(wantedTimePickedIds, offeredTimePickedId).then(
        (response) => {
          props.setLoading(false);
          props.setNumberOfAddedRequests(props.numberOfAddedRequests + 1);
          setSuccessful(true);
          if (response.status === 'pending') {
            setMessage(
              'No match has been found for you request yet. Once a match has been found we will send you an email or you can track your requests below.'
            );
          } else {
            setMessage(
              'You are luckt! We have found a match for you! You can see the details down below, once you reach an agreement with your partner please click Done.'
            );
          }
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
    }
  };
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <Container>
      <Row>
        <div className="input_group">
          <InputGroup size="sm">
            <InputGroup.Text>Course</InputGroup.Text>
            <Form.Control
              value={subjectWordEntered}
              onChange={handleQuery}
              className="formControl"
            />{' '}
            <BsXLg className="removeWordIcon" onClick={() => setSubjectWordEntered('')} />
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

        <div className="dropdowns mt-3">
          <InputGroup size="sm">
            <DropdownButton variant="secondary" title="Time to change" className="control">
              {availableTimes.map((value, key) => (
                <Dropdown.Item
                  className="dropdownItem"
                  key={key}
                  onClick={() => handlePickingOfferedTime(value)}
                >
                  Group: {value.group} {value.day} {value.type} {value.startTime}:{value.endTime}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
              <tr>
                <th>Group</th>
                <th>Day</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {offeredTimePicked && (
                <tr>
                  <td>{offeredTimePicked.group}</td>
                  <td>{offeredTimePicked.day}</td>
                  <td>{offeredTimePicked.type === 'lec' ? 'Lecture' : 'Tutorial'}</td>
                  <td>{offeredTimePicked.startTime + ':' + offeredTimePicked.endTime}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className=" dropdowns mt-3">
          <InputGroup size="sm">
            <DropdownButton variant="secondary" title="Time(s) you want" className="control">
              {availableTimes.map((value, key) => (
                <Dropdown.Item
                  className="dropdownItem"
                  key={key}
                  onClick={() => handlePickingWantedTime(value)}
                >
                  Group: {value.group} {value.day} {value.type} {value.startTime}:{value.endTime}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {/* /<Form.Control className="formControl" value={wantedTimeWordEntered} readOnly /> */}
          </InputGroup>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
              <tr>
                <th>Group</th>
                <th>Day</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {wantedTimePicked && (
                <>
                  {wantedTimePicked.map((value, key) => (
                    <tr key={key}>
                      <td>{value.group}</td>
                      <td>{value.day}</td>
                      <td>{value.type === 'lec' ? 'Lecture' : 'Tutorial'}</td>
                      <td>{value.startTime + ':' + value.endTime}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => HandleDeleteWantedRequestsFromTable(value.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </div>
        <div className="submitButton">
          <Button
            variant="secondary"
            size="md"
            className="mt-2 "
            onClick={() => HandleSubmitRequest()}
          >
            Submit Request
          </Button>
        </div>

        {message && (
          <div className="form-group mt-3">
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
              {message}
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default AddSwapRequest;
