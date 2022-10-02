import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import loginServices from '../Login/Services/login.services';
import authHeader from '../../Global/auth-header';
import './Header.scss';

const Header = () => {
  const [loggedIn, setLoggetIn] = useState(Object.keys(authHeader()).length ? true : false);

  const logOut = () => {
    loginServices.logout();
    setLoggetIn(false);
    window.location.reload();
  };

  return (
    <section id="navbar">
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/swap">Swap</Nav.Link>
              <Nav.Link href="/explore-request">Explore</Nav.Link>
              {loggedIn ? (
                <>
                  <Nav.Link href="/swapstatus">Swap Status</Nav.Link>
                </>
              ) : (
                <></>
              )}
            </Nav>
            <Nav>
              {loggedIn ? (
                <>
                  <Nav.Link href="/user">Profile</Nav.Link>
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
