import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const location = useLocation();

  const addPostIcon = (
    <NavLink
      to="/posts/create"
      className={
        location.pathname === "/posts/create"
          ? `${styles.NavLink} ${styles.Active}`
          : styles.NavLink
      }
    >
      <i className="far fa-plus-square"></i>Add Post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        to="feed"
        className={
          location.pathname === "/feed"
            ? `${styles.NavLink} ${styles.Active}`
            : styles.NavLink
        }
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        to="/liked"
        className={
          location.pathname === "/liked"
            ? `${styles.NavLink} ${styles.Active}`
            : styles.NavLink
        }
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>

      <NavLink to="/" onClick={handleSignOut} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>

      <NavLink
        to={`/profile/${currentUser?.profile_id}`}
        onClick={() => {}}
        className={styles.NavLink}
      >
        <Avatar src={currentUser?.profile_image} text="profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={
          location.pathname === "/signin"
            ? `${styles.NavLink} ${styles.Active}`
            : styles.NavLink
        }
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={
          location.pathname === "/signup"
            ? `${styles.NavLink} ${styles.Active}`
            : styles.NavLink
        }
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => {
            console.log("Navbar toggled");
            setExpanded(!expanded);
          }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            <NavLink
              to="/"
              className={
                location.pathname === "/"
                  ? `${styles.NavLink} ${styles.Active}`
                  : styles.NavLink
              }
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
