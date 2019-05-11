import React, {Component} from 'react';
import axios from '../../../axios-orders';
import {connect} from "react-redux";

import Button from '../../button/button';
import Spinner from '../../spinner/spinner';
import Input from '../../input/input';

import {
	sendOrderRequest,
	sendOrderSuccess,
	sendOrderError
} from '../../store/actions';
import checkValidity from '../../utility/utility';

import './contact-data.css';

class ContantData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					autoComplete: 'off',
					type: 'text',
					name: 'name',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					autoComplete: 'off',
					type: 'text',
					name: 'street',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					autoComplete: 'off',
					type: 'text',
					name: 'postcode',
					placeholder: 'Postal Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					autoComplete: 'off',
					type: 'text',
					name: 'coutry',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					autoComplete: 'off',
					type: 'email',
					name: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true,
				touched: false
			}
		},
		isFormValid: false,
	};

	orderHandler = e => {
		e.preventDefault();

		const {ingredients, totalPrice, sendOrderRequest, sendOrderSuccess, sendOrderError, token, userId} = this.props;

		sendOrderRequest();

		const orderData = Object.entries(this.state.orderForm).reduce(
			(acc, [key, value]) => {
				acc[key] = value.value;
				return acc;
			},
			{}
		);

		const order = {
			ingredients,
			price: totalPrice,
			orderData,
			userId
		};

		axios
			.post('/orders.json?auth=' + token, order)
			.then(res => {
				sendOrderSuccess();
				this.props.history.push('/');
			})
			.catch(error => {
				sendOrderError(error);
			});
	};

	inputChangeHandler = (e, id) => {
		const value = e.target.value;

		this.setState(prevState => {
			const orderFormCopy = {...prevState.orderForm};
			orderFormCopy[id].value = value;
			orderFormCopy[id].valid = checkValidity(
				orderFormCopy[id].value,
				orderFormCopy[id].validation
			);
			let isFormValid = false;
			if (!Object.values(orderFormCopy).filter(it => !it.valid).length) {
				isFormValid = true;
			}
			return {
				orderForm: orderFormCopy,
				isFormValid
			};
		});
	};

	inputBlurHandler = (id) => {
		this.setState(prevState => {
			const orderFormCopy = {...prevState.orderForm};
			orderFormCopy[id].touched = true;
			return {
				orderForm: orderFormCopy
			};
		});
	};

	render() {
		const inputs = Object.entries(this.state.orderForm).map(
			([id, input], idx) => {
				const {elementType, elementConfig, value, valid, touched} = input;
				return (
					<Input
						key={id + idx}
						id={id}
						elementType={elementType}
						elementConfig={elementConfig}
						value={value}
						valid={valid}
						touched={touched}
						shouldValidate={input.validation}
						onChange={this.inputChangeHandler}
						onBlur={this.inputBlurHandler}
					/>
				);
			}
		);

		let form = (
			<form onSubmit={this.orderHandler}>
				<div className='form-group'>{inputs}</div>
				<Button disabled={!this.state.isFormValid} mod='success'>ORDER</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner/>;
		}

		return (
			<div className='contact-data'>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = ({ingredients, totalPrice, loading, token, userId}) => {
	return {
		ingredients,
		totalPrice,
		loading,
		token,
		userId
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendOrderRequest: () => dispatch(sendOrderRequest()),
		sendOrderSuccess: () => dispatch(sendOrderSuccess()),
		sendOrderError: (error) => dispatch(sendOrderError(error))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContantData);
