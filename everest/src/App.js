import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import UserDashboard from './containers/UserDashboard';
import * as actions from './stores/actions/index';

function App(props) {

	useState(() => {

		props.checkAuthState();

		return () => {
			props.checkAuthState();
		}
	}, []);

	let router;

	if (props.isAuthenticated) {
		router = (
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/" exact component={UserDashboard} />
			</Switch>
		)
	} else {
		router = (
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
			</Switch>
		)
	}

	return router;
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkAuthState: () => dispatch(actions.checkAuthState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
