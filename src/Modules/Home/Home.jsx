import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.scss';
import { BsSearch } from 'react-icons/bs';
// import { RiMindMap } from 'react-icons/ri';
//import { FaRegListAlt, FaExchangeAlt } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import { Container } from 'react-bootstrap';
const Home = () => {
  return (
    <section id="home">
      <Container className="home-text">
        <h1>Swap Courses Timeslots</h1>
        <h6 className="mt-5">Get a day free, fill a gap or attend with your friends. </h6>
        <h6>Submit a request to find your matching buddy to swap now </h6>
      </Container>
      <Container className="homeContainer">
        <a href="/swap">
          <Card className="homeCard">
            <FaExchangeAlt className="icon" />
            Submit a Request
          </Card>
        </a>
        <a href="/explore-request">
          <Card className="homeCard">
            <BsSearch className="icon" />
            Explore other Requests{' '}
          </Card>
        </a>
      </Container>
      <Footer />
    </section>
  );
};

export default Home;
