import React from 'react';

import Burger from '../burger/burger';
import Button from '../button/button';

import './checkout-summary.css';

const CheckoutSummary = props => {
  return (
    <div className='checkout-summary'>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', height: '300px', margin: '0 auto 100px' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button mod='danger' clickHandler={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button mod='success' clickHandler={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
