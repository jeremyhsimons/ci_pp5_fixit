import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Profile from './Profile';
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfiles = ({mobile}) => {

  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"}`}>
      {popularProfiles.results.length ? (
        <>
          <h3>Trending contributors:</h3>
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
        <p>Loading...</p>
      )}
      
    </Container>
  )
}

export default PopularProfiles