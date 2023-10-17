import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

import buttonStyles from '../../styles/Button.module.css'

const Profile = (props) => {
  const {profile, mobile, imageSize=55} = props;
  const {id, star_id, stars_count, image, profile_owner} = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile_owner;
  const {handleStar, handleUnStar} = useSetProfileData();

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
      <div className={`text-left ${!mobile && "mr-auto"}`}>
        {!mobile && currentUser && !is_owner && (
          star_id ? (
            <Button
              className={buttonStyles.ActiveButton}
              onClick={() => handleUnStar(profile)}
            >
              un-star
            </Button>
          ) : (
            <Button
              className={buttonStyles.Button}
              onClick={() => handleStar(profile)}
            >
              star
            </Button>
          )
        )}
      </div>
      
      <div className='mx-2'>
        {star_id ? (
          <span> <i className="fa-solid fa-star"></i> {stars_count}</span>
        ) : (
          <span> <i className="fa-regular fa-star"></i> {stars_count}</span>
        )}
        <strong className='ml-3'>{profile_owner}</strong>
      </div>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          IMG
        </Link>
      </div>
      
    </div>
  )
}

export default Profile