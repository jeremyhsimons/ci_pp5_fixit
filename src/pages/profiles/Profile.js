import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

import buttonStyles from '../../styles/Button.module.css'
import styles from '../../styles/Profile.module.css'
import Avatar from '../../components/Avatar';

const Profile = (props) => {
  const {profile, mobile, imageSize=55} = props;
  const {id, star_id, stars_count, image, profile_owner} = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile_owner;
  const {handleStar, handleUnStar} = useSetProfileData();

  return (
    <div className={`d-flex align-items-center ${mobile && "flex-column"} ${styles.Profile}`}>
      <div className={`${!mobile && "mr-auto"}`}>
        {!mobile && currentUser && !is_owner && (
          star_id ? (
            <Button
              className={`py-2 ${buttonStyles.ActiveButton}`}
              onClick={() => handleUnStar(profile)}
            >
              un-star
            </Button>
          ) : (
            <Button
              className={`py-2 ${buttonStyles.Button}`}
              onClick={() => handleStar(profile)}
            >
              star
            </Button>
          )
        )}
      </div>
      
      <div className='mx-2'>
        {/* {star_id ? (
          <span> <i className="fa-solid fa-star"></i> {stars_count}</span>
        ) : (
          <span> <i className="fa-regular fa-star"></i> {stars_count}</span>
        )} */}
        {/* <strong className='ml-3'>{profile_owner}</strong> */}
      </div>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <span className="d-none d-lg-block p-0 p-lg-2">
            <Avatar src={image} height={80} text={profile_owner}/>
          </span>
          <span className='d-sm-block d-md-none p-0 p-lg-2'>
            <Avatar src={image} height={50} text={profile_owner} />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Profile