import React from 'react';
import {NavLink} from 'react-router-dom';

import './nav-item.css';

const NavItem = (props) => {
  return (
    <li className='navigation-item'>
      <NavLink to={props.link} exact>{props.children}</NavLink>
    </li>
  );
};

export default NavItem;
