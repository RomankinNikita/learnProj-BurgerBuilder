import React from 'react';
import BuildControl from './build-control/build-control';

import './build-controls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
  const ingredientControls = controls.map(ctrl => (
    <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      type={ctrl.type}
      disabledInfo={props.disabledInfo[ctrl.type]}
      addIngredient={props.addIngredient}
      removeIngredient={props.removeIngredient}
    />
  ));
  return (
    <div className='build-controls'>
      <p>
        Current Price: <strong>{props.price} $</strong>
      </p>
      {ingredientControls}
      <button
        className='order-button'
        disabled={!props.isDisabledOrder}
        onClick={props.purchaseHandler}
      >
        {props.isAuthenticated ? 'ORDER NOW' : 'LOG IN FOR CONTINUE'}
      </button>
    </div>
  );
};

export default BuildControls;
