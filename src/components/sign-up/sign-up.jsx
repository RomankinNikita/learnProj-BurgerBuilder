import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

import './sign-up.css';
import {
	signUpStart,
	signUpSuccess,
	signUpError
} from '../store/actions';
import checkValidity from '../utility/utility';

class SignUp extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
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

		const {signUpStart, signUpSuccess, signUpError} = this.props;

		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
			returnSecureToken: true
		};

		signUpStart();

		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8-H6gEbneasG74twdy3D0BY2yIeRIRm0', authData)
			.then((response) => {
				signUpSuccess(response.data.email);
				this.props.history.push('/sign-in');
			})
			.catch((error) => {
				signUpError(error.response.data.error);
			});
	};

	goToSignInHandler = () => {
		this.props.history.push('/sign-in');
	};

	render() {
		const formElementsArray = Object.entries(this.state.controls).map(([id, config]) => {
			return {id, config};
		});

		const errorMessage = this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p> : null;

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

		const content = this.props.loading ? <Spinner/> : (<Fragment>
				<h2>SIGN-UP</h2>
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button mod="success">SIGN-UP</Button>
					<Button mod='option' clickHandler={this.goToSignInHandler}>SIGN-IN</Button>
				</form>
			</Fragment>
		);

		return (
			<div className="sign-up">
				{content}
			</div>
		);
	}
}

const mapStateToProps = ({loading, error}) => {
	return {
		loading,
		error
	}
};

const mapDispatchToProps = dispatch => {
	return {
		signUpStart: () => dispatch(signUpStart()),
		signUpSuccess: (email) => dispatch(signUpSuccess(email)),
		signUpError: (error) => dispatch(signUpError(error))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);