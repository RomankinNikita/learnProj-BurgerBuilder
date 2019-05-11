import React, { Fragment } from 'react';
import Backdrop from '../backdrop/backdrop';

import './modal.css';

const Modal = props => {
  return (
    <Fragment>
      <Backdrop
        show={props.show}
        close={props.close}
      />
      <div
        className='modal'
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
