import React, {Component, Fragment, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import BurgerBuilder from '../burger-builder/burger-builder';
import Toolbar from '../navigation/toolbar/toolbar';
import SideDrawer from '../navigation/side-drawer/side-drawer';
import Spinner from '../spinner/spinner';

import './app.css';
import {connect} from "react-redux";
import {logOut, signInSuccess} from '../store/actions';

const Checkout = lazy(() => import('../checkout/checkout'));
const Orders = lazy(() => import('../orders/orders'));
const SignUp = lazy(() => import('../sign-up/sign-up'));
const SignIn = lazy(() => import('../sign-in/sign-in'));
const LogOut = lazy(() => import('../log-out/log-out'));

class App extends Component {
	state = {
		showSideDrawer: false
	};

	componentDidMount() {
		const {logOut, signInSuccess} = this.props;
		const token = localStorage.getItem('token');

		if (!token) {
			logOut();
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				const logOutTime = expirationDate.getTime() - new Date().getTime();

				signInSuccess(token, userId);

				setTimeout(() => {
					logOut();
				}, logOutTime);
			} else {
				logOut();
			}
		}
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	};

	menuToggle = () => {
		this.setState(prevState => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	};

	render() {
		const {isAuth} = this.props;

		let routes = (
			<Suspense fallback={<Spinner/>}>
				<Switch>
					<Route path='/sign-up' component={SignUp}/>
					<Route path='/sign-in' component={SignIn}/>
					<Route path='/' exact component={BurgerBuilder}/>
					<Redirect to='/'/>
				</Switch>
			</Suspense>
		);

		if (isAuth) {
			routes = (
				<Suspense fallback={<Spinner/>}>
					<Switch>
						<Route path='/checkout' component={Checkout}/>
						<Route path='/orders' component={Orders}/>
						<Route path='/log-out' component={LogOut}/>
						<Route path='/' exact component={BurgerBuilder}/>
						<Redirect to='/'/>
					</Switch>
				</Suspense>
			);
		}

		return (
			<Fragment>
				<Toolbar menuToggle={this.menuToggle}/>
				<SideDrawer
					show={this.state.showSideDrawer}
					sideDrawerClosedHandler={this.sideDrawerClosedHandler}
				/>
				{routes}
			</Fragment>
		);
	}
}

const mapStateToProps = ({token}) => {
	return {
		isAuth: token !== null
	}
};

const mapDispatchToProps = dispatch => {
	return {
		logOut: () => dispatch(logOut()),
		signInSuccess: (idToken, localId) => dispatch(signInSuccess(idToken, localId)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
