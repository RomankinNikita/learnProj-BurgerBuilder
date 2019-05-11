import React from 'react'

import './order.css';

const Order = (props) => {
  const {price, ingredients} = props;

  const ingredientsList = Object.entries(ingredients).map(item => {
    const str = `${item[0]} (${item[1]})`;
    return str[0].toUpperCase() + str.slice(1);
  }).join(', ');

  return (
    <div className='order'>
      <p>Ingredients: {ingredientsList}</p>
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  );
};

export default Order;
