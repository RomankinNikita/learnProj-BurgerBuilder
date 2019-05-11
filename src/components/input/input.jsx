import React from 'react';

import './input.css';

const Input = props => {
  const {
    id,
    elementConfig,
    elementType,
    value,
    valid,
    onChange,
    onBlur,
    shouldValidate,
    touched
  } = props;
  let inputElement = null;
  let invalidClass = '';
  let className = 'inputElement';
  let errorMessage = null;

  if (!valid && shouldValidate && touched) {
    invalidClass = 'invalid';
    className += ' ' + invalidClass;
    errorMessage = <span className='error-message'>incorrect value!</span>;
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          id={id}
          className={className}
          {...elementConfig}
          value={value}
          onChange={e => {
            onChange(e, id);
          }}
          onBlur={() => {
            onBlur(id);
          }}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          id={id}
          className={className}
          {...elementConfig}
          value={value}
          onChange={() => onChange(id)}
          onBlur={() => {
            onBlur(id);
          }}
        />
      );
      break;
    case 'select':
      const options = elementConfig.options.map((opt, idx) => {
        return (
          <option key={opt + idx} value={opt.value}>
            {opt.displayValue}
          </option>
        );
      });
      inputElement = (
        <select
          id={id}
          className={className}
          value={value}
          onChange={e => {
            onChange(e, id);
          }}
          onBlur={() => {
            onBlur(id);
          }}
        >
          {options}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          id={id}
          className={className}
          {...elementConfig}
          value={value}
          onChange={() => onChange(id)}
        />
      );
  }

  return (
    <div className='input'>
      <label className='label'>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default Input;
