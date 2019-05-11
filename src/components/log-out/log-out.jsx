import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logOut} from '../store/actions';

class LogOut extends Component {
	componentDidMount() {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
		this.props.logOut();
	}

	render() {
		return <Redirect to="/"/>
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logOut: () => dispatch(logOut())
	}
};

export default connect(null, mapDispatchToProps)(LogOut);