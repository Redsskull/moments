import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink, useLocation  } from 'react-router-dom';



const NavBar = () => {
  const location = useLocation();
  return (
    <Navbar className = {styles.NavBar}expand="md" fixed="top">
      <Container>
        <NavLink to = "/">
        <Navbar.Brand><img src={logo} alt = "logo" height="45"/></Navbar.Brand>
         </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
          <NavLink
              to="/"
              className={location.pathname === "/" ? `${styles.NavLink} ${styles.Active}` : styles.NavLink}
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
              to="/signin"
              className={location.pathname === "/signin" ? `${styles.NavLink} ${styles.Active}` : styles.NavLink}
            >
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className={location.pathname === "/signup" ? `${styles.NavLink} ${styles.Active}` : styles.NavLink}
            >
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
