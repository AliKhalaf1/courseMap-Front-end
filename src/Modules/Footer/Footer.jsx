import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.scss';
import AliImage from '../../Assets/Ali.jpeg';
import KhaledImage from '../../Assets/Khaled.jpeg';
import YoussefImage from '../../Assets/Youssef.jpeg';
const Footer = () => {
  return (
    <div id="footer">
      <h5>Created by</h5>
      <Container className="footerContainer ">
        <div className="image_container">
          <img src={AliImage} alt="" />
          <p>Ali Khalaf</p>
        </div>
        
        <div className="image_container">
        <a href="https://solarsystem.nasa.gov/moons/earths-moon/overview/" target="_blank">
          <img src={KhaledImage} alt="" />
          <p>Khaled Mamdouh</p>
          </a>
        </div>
        
        <div className="image_container">
          <img src={YoussefImage} alt="" />
          <p>Yousef Gilany</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
