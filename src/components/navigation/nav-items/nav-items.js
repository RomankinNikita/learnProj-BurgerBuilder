import React from 'react';
import NavItem from '../nav-item/nav-item';

import './nav-items.css';
import {connect} from "react-redux";

export const NavItems = ({token}) => {
  return (
    <ul className='navigation-items'>
      <NavItem link='/'>
        Burger Builder
      </NavItem>
			{token !== null ? <NavItem link='/orders'>Orders</NavItem> : null}
			{token === null ? <NavItem link='/sign-up'>Sign-Up</NavItem> : null}
			{token !== null ? <NavItem link='/log-out'>Log-Out</NavItem> : <NavItem link='/sign-in'>Sign-In</NavItem>}
    </ul>
  );
};

const mapStateToProps = ({token}) => {
	return {
		token
	}
};

export default connect(mapStateToProps)(NavItems);
