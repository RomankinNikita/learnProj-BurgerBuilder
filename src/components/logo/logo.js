import React from 'react';

import './logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <img src={burgerLogo} alt="logo" />
    </div>
  );
};

export default Logo;
