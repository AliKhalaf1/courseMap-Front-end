import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Home.scss';
import { BsTable } from 'react-icons/bs';
import { RiMindMap } from 'react-icons/ri';
import { FaRegListAlt, FaExchangeAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <section id="home">
      <div className="home-text">
        <h3>CUFE Credit Hour System</h3>
        <h1>Virtual Assistan</h1>
        <h4>Customize your future course map the way you like</h4>
      </div>
      <CardGroup className="cards" md={1}>
        <Card className="card">
          <a href="/swap">
            <Card.Body>
              <FaExchangeAlt className="icon" />
              <h5>Swap Request.</h5>
              <p>Get a day free, fill a gap or attend with your friends. Swap a course with some one.</p>
            </Card.Body>
          </a>
        </Card>

        <Card href="#course-map">
          <a href="#course-map">
            <Card.Body>
              <RiMindMap className="icon" />
              <h5>Make a course map.</h5>
              <p>Create a full course map for the whole four years of your program.</p>
            </Card.Body>
          </a>
        </Card>

        <Card>
          <a href="#course-map">
            <Card.Body>
              <FaRegListAlt className="icon" />
              <h5>Discover cousers.</h5>
              <p>List all the courses you can take during your program study.</p>
            </Card.Body>
          </a>
        </Card>
      </CardGroup>
    </section>
  );
};

export default Home;
