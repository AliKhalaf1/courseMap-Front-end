import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.scss'
import AliImage from '../../Assets/Ali.jpeg'
import KhaledImage from '../../Assets/Khaled.jpeg'
import YoussefImage from '../../Assets/Youssef.jpeg'
const Footer = () => {
  return (
    <div id="footer"> 
    <h5>Created by</h5>
        <Container className='footerContainer '>
           
        <div className='image_container'>
            <img src={AliImage} />
            <p>Ali Khalaf</p>
        </div>
        <div className='image_container'>
            <img src={KhaledImage} />
            <p>Khaled Mamdouh</p>
        </div>
        <div className='image_container'>
            <img src={YoussefImage} />
            <p>Yousef Gilany</p>
        </div>

        </Container>
    </div>
  )
}

export default Footer