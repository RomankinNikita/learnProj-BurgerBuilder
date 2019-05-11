import React, { Fragment } from 'react';
import Logo from '../../logo/logo';
import NavItems from '../nav-items/nav-items';
import Backdrop from '../../backdrop/backdrop';

import './side-drawer.css';

const SideDrawer = props => {
  let attachedClasses = 'side-drawer close';
  if (props.show) {
    attachedClasses = 'side-drawer open';
  }
  return (
    <Fragment>
      <Backdrop
        show={props.show}
        close={props.sideDrawerClosedHandler}
      />
      <div className={attachedClasses}>
        <div style={{ height: '11%' }}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
