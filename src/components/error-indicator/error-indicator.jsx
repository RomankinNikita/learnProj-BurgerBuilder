import React from 'react';
import './error-indicator.scss';

const ErrorIndicator = (props) => {
	return (
		<div className="error">{props.children}</div>
	)
};

export default ErrorIndicator;