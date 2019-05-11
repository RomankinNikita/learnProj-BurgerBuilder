import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

import './sign-in.scss';
import {
	signInStart,
	signInSuccess,
	signInError,
	logOut
} from '../store/actions';
import checkValidity from '../utility/utility';

class SignIn extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: this.props.email || '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
			}
		};
		this.setState({controls: updatedControls});
	};

	inputBlurHandler = (id) => {
		this.setState(prevState => {
			const controlsCopy = {...prevState.controls};
			controlsCopy[id].touched = true;
			return {
				orderForm: controlsCopy
			};
		});
	};

	submitHandler = (event) => {
		event.preventDefault();

		const {signInStart, signInSuccess, signInError, logOut, ingredients} = this.props;

		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
			returnSecureToken: true
		};

		signInStart();

		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8-H6gEbneasG74twdy3D0BY2yIeRIRm0', authData)
			.then((response) => {
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);

				signInSuccess(response.data.idToken, response.data.localId);
				setTimeout(() => {
					logOut();
				}, response.data.expiresIn * 1000);

				let ingredientsLength = 0;

				if (ingredients !== null) {
					ingredientsLength = Object.values(ingredients).reduce((acc, it) => {
						return acc + it;
					}, 0);
				}

				if (ingredientsLength) {
					this.props.history.push('/checkout');
				} else {
					this.props.history.push('/');
				}
			})
			.catch((error) => {
				signInError(error.response.data.error);
			});
	};

	goToSignUpHandler = () => {
		this.props.history.push('/sign-up');
	};

	render() {
		const formElementsArray = Object.entries(this.state.controls).map(([id, config]) => {
			return {id, config};
		});

		const form = formElementsArray.map(formElement => (
			<Input
				id={formElement.id}
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				valid={formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				onChange={this.inputChangedHandler}
				onBlur={this.inputBlurHandler}
			/>
		));

		const errorMessage = this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p> : null;

		const content = this.props.loading ? <Spinner/> : (<Fragment>
				<h2>SIGN-IN</h2>
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button mod="success">SIGN-IN</Button>
					<Button mod='option' clickHandler={this.goToSignUpHandler}>SIGN-UP</Button>
				</form>
			</Fragment>
		);

		return (
			<div className="sign-in">
				{content}
			</div>
		);
	}
}

const mapStateToProps = ({error, loading, email, ingredients}) => {
	return {
		error,
		loading,
		email,
		ingredients
	}
};

const mapDispatchToProps = dispatch => {
	return {
		signInStart: () => dispatch(signInStart()),
		signInSuccess: (idToken, localId) => dispatch(signInSuccess(idToken, localId)),
		signInError: (error) => dispatch(signInError(error)),
		logOut: () => dispatch(logOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);