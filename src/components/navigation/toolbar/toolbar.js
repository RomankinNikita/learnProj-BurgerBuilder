import React from 'react';
import Logo from '../../logo/logo';
import NavItems from '../nav-items/nav-items';
import Menu from '../../menu/menu';

import './toolbar.css';

const Toolbar = props => {
  return (
    <header className='toolbar'>
      <Menu clicked={props.menuToggle} />
      <div style={{ height: '80%' }}>
        <Logo />
      </div>
      <nav className='desktop-only'>
        <NavItems />
      </nav>
    </header>
  );
};

export default Toolbar;
