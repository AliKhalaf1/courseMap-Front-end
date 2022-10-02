import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Home.scss';
// import { BsTable } from 'react-icons/bs';
// import { RiMindMap } from 'react-icons/ri';
//import { FaRegListAlt, FaExchangeAlt } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import Footer from '../Footer/Footer';
const Home = () => {
  return (
    <section id="home">
      <div className="home-text">
        <h3>CUFE Credit Hour System</h3>
        <h1>Virtual Assistant</h1>
      </div>
      <CardGroup className="cards" md={1}>
        <Card className="card">
          <a href="/swap">
            <Card.Body>
              <FaExchangeAlt className="icon" />
              <h5>Swap Request.</h5>
              <p>
                Get a day free, fill a gap or attend with your friends. Swap a course with someone.
              </p>
            </Card.Body>
          </a>
        </Card>

        <Card className="mystery">
          <h1>?</h1>
        </Card>

        <Card className="mystery">
          <h1>?</h1>
        </Card>
      </CardGroup>
      <Footer />
    </section>
  );
};

export default Home;
