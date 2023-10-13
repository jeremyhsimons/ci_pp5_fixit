import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';

const Profile = (props) => {
  const {profile, mobile, imageSize=55} = props;
  const {id, star_id, stars_count, image, profile_owner} = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile_owner;

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
      <div className={`text-left ${!mobile && "mr-auto"}`}>
        {!mobile && currentUser && !is_owner && (
          star_id ? (
            <Button onClick={() => {}}>un-star</Button>
          ) : (
            <Button onClick={() => {}}>star</Button>
          )
        )}
      </div>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          IMG
        </Link>
      </div>
      <div className='mx-2'>
        <strong>{profile_owner}</strong>
        {star_id ? (
          <span> | <i className="fa-solid fa-star"></i> {stars_count}</span>
        ) : (
          <span> | <i class="fa-regular fa-star"></i> {stars_count}</span>
        )}
      </div>
      
    </div>
  )
}

export default Profile