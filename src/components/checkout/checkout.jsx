import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";

import CheckoutSummary from '../checkout-summary/checkout-summary';
import ContactData from './contact-data/contact-data';

import './checkout.css';

class Checkout extends Component {
	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	checkoutCancelled = () => {
		this.props.history.goBack();
	};

	render() {
		const {ingredients} = this.props;
		return (
			<div>
				<CheckoutSummary
					ingredients={ingredients}
					checkoutCancelled={this.checkoutCancelled}
					checkoutContinued={this.checkoutContinued}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ingredients}) => {
	return {
		ingredients
	}
};

export default connect(mapStateToProps)(Checkout);
