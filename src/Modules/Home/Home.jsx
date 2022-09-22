import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Home.scss'
import { BsTable } from 'react-icons/bs';
import { RiMindMap } from 'react-icons/ri';
import { FaRegListAlt } from 'react-icons/fa';


const Home = () => {
  return (
    <section id="home">
      <div className='home-text'>
        <h3>CUFE Credit Hour System</h3>
        <h1>Virtual Assistan</h1>
        <h4>Customize your future course map the way you like</h4>
      </div>
      <CardGroup className='cards' md={1} >
      <Card className='card'>
      <a href="#course-map">
        <Card.Body>
          <BsTable className="icon"/>
          <h6>Make a table.</h6>
          <p>
            Prepare a table for your next semester.
          </p>
        </Card.Body>
        </a>
      </Card>

      <Card href="#course-map">
        <a href="#course-map">
        <Card.Body>
          <RiMindMap className='icon'/>
          <h6>Make a course map.</h6>
          <p>
          Create a full course map for the whole four years of your program.
          </p>
        </Card.Body>
        </a>
      </Card>

      <Card>
      <a href="#course-map">
        <Card.Body>
          <FaRegListAlt className='icon'/>
          <h6>Discover cousers.</h6>
          <p>
          List all the courses you can take during your program study.
          </p>
        </Card.Body>
        </a>
      </Card>

    </CardGroup>
    </section>
  )
}

export default Home