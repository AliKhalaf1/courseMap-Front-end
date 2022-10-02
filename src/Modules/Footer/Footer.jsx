import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.scss'
import AliImage from '../../Assets/Ali.jpeg'
import KhaledImage from '../../Assets/Khaled.jpeg'
import YoussefImage from '../../Assets/Youssef.jpeg'
const Footer = () => {
  return (
    <div id="footer">
        <Container className='px-5'>
        <Row>
        <Col className='red'><img src={AliImage} /></Col>
        <Col><img src={KhaledImage} /></Col>
        <Col><img src={YoussefImage} /></Col>
      </Row>
        </Container>
    </div>
  )
}

export default Footer