import React from "react";

const Checkbox = ({ id, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;
