import React from "react";
import { Dropdown } from "react-bootstrap";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = () => {
  return(
    <Dropdown className="ml-auto" drop="left">
    <Dropdown.Toggle as={ThreeDots}/>

    <Dropdown.Menu className="text-center">
      <Dropdown.Item onClick={() => {}} aria-label="edit">
        <p>Edit</p>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => {}} aria-label="delete">
        <p>Delete</p>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}