import React from 'react'

import './button.css';

const Button = (props) => {
  const className = `button ${props.mod}`
  return (
    <button disabled={props.disabled} className={className} onClick={props.clickHandler}>
      {props.children}
    </button>
  );
};

export default Button;
