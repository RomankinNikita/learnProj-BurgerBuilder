import React from 'react';
import BurgerIngredient from './burger-ingredient/burger-ingredient';

import './burger.css';

const Burger = props => {
	let transformedIngredients = [];
	if (props.ingredients) {
		transformedIngredients = Object.entries(props.ingredients)
			.map(([key, value]) => {
				return [...Array(value)].map((item, idx) => {
					return <BurgerIngredient key={key + idx} type={key} />;
				});
			})
			.reduce((acc, el) => {
				return acc.concat(el);
			}, []);
	}

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }  

  return (
    <div className='burger'>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
