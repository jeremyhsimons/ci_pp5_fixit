import React from 'react';
import { Container, Image, } from 'react-bootstrap';
import noResults from '../assets/404.webp';

import styles from '../styles/NotFound.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import buttonStyles from '../styles/Button.module.css';

const NotFound = () => {
  return (
    <div className={`text-center ${styles.Card}`}>
      <h1 className={styles.Text}>404</h1>
      <h2 className={styles.Text}>Uh oh... It looks like the page you&lsquo;re looking for doesn&lsquo;t exist.</h2>
      <Container className='d-flex justify-content-center'>
        <Image className={styles.Image} src={noResults} alt='Crashed car'/>
      </Container>
      <Link className={`p-2 my-2 ${buttonStyles.Button}`} to="/">
        HOME
      </Link>
    </div>
  );
};

export default NotFound;