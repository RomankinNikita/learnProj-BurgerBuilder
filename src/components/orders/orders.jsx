import React, {Component} from 'react';

import Order from './order/order';
import Spinner from '../spinner/spinner';
import axios from '../../axios-orders';
import ErrorIndicator from '../error-indicator/error-indicator';
import './orders.css';
import {connect} from "react-redux";
import {
	ordersRequested,
	ordersLoaded,
	ordersError
} from '../store/actions';

class Orders extends Component {

	componentDidMount() {
		const {
			ordersRequested,
			ordersLoaded,
			ordersError,
			token,
			userId
		} = this.props;
		ordersRequested();
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('/orders.json' + queryParams)
			.then(res => {
				const orders = Object.values(res.data).map((item, idx) => {
					return {
						...item,
						id: 100 + idx
					};
				});
				ordersLoaded(orders);
			})
			.catch(error => {
				ordersError(error);
			});
	}

	render() {
		let orders = this.props.loading ? (
			<Spinner/>
		) : (
			this.props.orders.map(it => {
				return (
					<Order
						key={it.id}
						price={it.price}
						ingredients={it.ingredients}
					/>
				);
			})
		);

		const {error} = this.props;
		let errorMessage = '';

		if (error !== null) {
			errorMessage = error.message === 'Request failed with status code 401' ? 'You have to log in' : error.message;
			orders = <ErrorIndicator>{errorMessage}</ErrorIndicator>;
		}

		return (
			<div className='orders'>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = ({orders, loading, token, error, userId}) => {
	return {
		orders,
		loading,
		token,
		error,
		userId
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		ordersRequested: () => dispatch(ordersRequested()),
		ordersLoaded: (orders) => dispatch(ordersLoaded(orders)),
		ordersError: (error) => dispatch(ordersError(error))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
