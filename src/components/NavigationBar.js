import React from 'react'
import { Navbar, Button, Nav, NavDropdown, Form, FormControl, Container  } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../styles/NavigationBar.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import axios from 'axios'

const NavigationBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try{
        await axios.post('dj-rest-auth/logout/');
        setCurrentUser(null);
    } catch(err){
        console.log(err);
    }
  }

  const loggedInIcons = (
    <>
      <h1>{currentUser?.username}</h1>
      <NavLink 
        className={styles.NavLink} 
        activeClassName={styles.Active} 
        to="/signin"
        onClick={handleSignOut}
        >
          Sign out
      </NavLink>
    </>
  )
  const loggedOutIcons = <><h1>Please Log in</h1></>


  return (
    <div>
        <Navbar className={styles.NavigationBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                  <Navbar.Brand href="#home">Fixit</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                            Home
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                            Sign Up
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                            Sign In
                        </NavLink>
                        {currentUser ? loggedInIcons: loggedOutIcons}

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavigationBar