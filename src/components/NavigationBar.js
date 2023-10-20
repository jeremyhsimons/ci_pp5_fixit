import React from 'react'
import { Navbar, Button, Nav, NavDropdown, Form, FormControl, Container, Row  } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../styles/NavigationBar.module.css'
import appStyles from '../App.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import axios from 'axios'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'
import { removeTokenTimestamp } from '../utils/utils'

const NavigationBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try{
        await axios.post('dj-rest-auth/logout/');
        setCurrentUser(null);
        removeTokenTimestamp();
    } catch(err){
        console.log(err);
    }
  }

  const filterOptions = (
    <>
    <Row className='d-none d-md-block p-0 p-lg-2'>
      <div className={`${appStyles.Main} ${styles.PostTypes} d-flex align-items-center`}>
        <Container className='d-flex align-items-center justify-content-center'>
          <NavLink 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            to="/bikes-and-cars" 
            >
              Bikes/Cars
          </NavLink>
          <NavLink 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            to="/electronics" 
            >
              Electronics
          </NavLink>
          <NavLink 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            to="/diy" 
            >
              DIY
          </NavLink>
        </Container>
      </div>
    </Row>
    <Row className='d-sm-block d-md-none p-0 p-lg-2'>
      <div className={`${appStyles.Main} ${styles.PostTypes} d-flex align-items-center`}>
        <Container className='d-flex align-items-center justify-content-center'>
          <NavLink 
            className=""
            activeClassName={styles.Active}
            to="/bikes-and-cars" 
            >
            <i className="fa-solid fa-car-side"></i>
          </NavLink>
          <NavLink 
            className=""
            activeClassName={styles.Active}
            to="/electronics" 
            >
              <i class="fa-solid fa-microchip"></i>
          </NavLink>
          <NavLink 
            className="" 
            activeClassName={styles.Active}
            to="/diy" 
            >
              <i class="fa-solid fa-hammer"></i>
          </NavLink>
        </Container>
      </div>
    </Row>
    </>
  )

  const loggedInIcons = (
    <>
      <NavLink 
        className={styles.NavLink} 
        activeClassName={styles.Active} 
        to="/signin"
        onClick={handleSignOut}
        >
          Sign out
      </NavLink>
      <NavLink 
        className={styles.NavLink} 
        activeClassName={styles.Active}
        to="/posts/create" 
        >
          Create a post
      </NavLink>
      <NavLink 
        className={styles.NavLink} 
        activeClassName={styles.Active}
        to="/bookmarks" 
        >
          Bookmarks
      </NavLink>
    </>
  )
  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
          Sign Up
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
          Sign In
      </NavLink>
    </>
  )


  return (
    <div>
        <Navbar expanded={expanded} className={styles.NavigationBar} expand="md" fixed="top">
            <Container>
                <NavLink className="mr-3" to="/">
                  <i className={`fa-solid fa-screwdriver-wrench ${styles.Logo}`}></i>
                  
                </NavLink>
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                            Home
                        </NavLink>
                        
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className={styles.Buffer}></div>
        {currentUser ? filterOptions : <p>Log in to filter posts</p>}
    </div>
  )
}

export default NavigationBar