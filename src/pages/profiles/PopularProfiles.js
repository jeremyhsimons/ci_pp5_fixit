import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Profile from './Profile';
import { useProfileData } from '../../contexts/ProfileDataContext';

import profileListStyles from '../../styles/PopularProfiles.module.css'
import spinner from '../../assets/spinner_updated.gif'

const PopularProfiles = ({mobile}) => {

  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"} ${profileListStyles.Card}`}>
      {popularProfiles.results.length ? (
        <>
          <h3 className={profileListStyles.Title}>Trending contributors:</h3>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map(profile => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map(profile => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Container className='d-flex justify-content-center'>
          <Image src={spinner} />
        </Container>
        
      )}
    </Container>
  )
}

export default PopularProfiles