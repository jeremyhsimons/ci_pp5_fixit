import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const threeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

const threeDotsHorizontal = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-h"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({handleEdit, handleDelete}) => {
  return(
    <Dropdown className="ml-auto" drop="left">
    <Dropdown.Toggle as={threeDots}/>

    <Dropdown.Menu 
      className="text-center"
      popperConfig={{ strategy: "fixed" }}
    >
      <Dropdown.Item onClick={handleEdit} aria-label="edit">
        <p>Edit</p>
      </Dropdown.Item>
      <Dropdown.Item onClick={handleDelete} aria-label="delete">
        <p>Delete</p>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3`} drop="left">
      <Dropdown.Toggle as={threeDotsHorizontal} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          update username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          update password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};