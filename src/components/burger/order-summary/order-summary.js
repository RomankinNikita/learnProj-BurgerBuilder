import React, { Fragment } from 'react';
import Button from '../../button/button';

import './order-summary.css';

const OrderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).map(
    ([key, value], idx) => {
      return (
        <li key={key + value + idx}>
          <span className='order-capitalize'>{key}</span>: {value}
        </li>
      );
    }
  );
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul className='order-summary-list'>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button mod='danger' clickHandler={props.purchaseCancelHandler}>
        CANCEL
      </Button>
      <Button mod='success' clickHandler={props.purchaseContinueHandler}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
