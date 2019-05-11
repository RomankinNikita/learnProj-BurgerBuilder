import React from 'react';

import './build-control.css';

const BuildControl = props => {
  const { label, type, addIngredient, removeIngredient, disabledInfo } = props;
  return (
    <div className='build-control'>
      <div className='label'>{label}</div>
      <button
        className='less'
        disabled={!disabledInfo}
        onClick={() => removeIngredient(type)}
      >
        Less
      </button>
      <button
        className='more'
        onClick={() => addIngredient(type)}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
