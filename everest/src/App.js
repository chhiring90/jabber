import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import UserDashboard from './containers/UserDashboard';
import * as actions from './stores/actions/index';


function App(props) {

	useEffect(() => {
		props.checkAuthState();
		return () => {
			if (!props.isAuthenticated) {
				props.setAuthPathRedirect();
			}
		}
	}, [props.isAuthenticated]);

	let router;

	if (props.isAuthenticated) {
		router = (
			<Switch>
				<Route path="/signup" exact component={SignUp} />
				<Route path="/login" exact component={Login} />
				<Route path="/" exact component={UserDashboard} />
			</Switch>
		);
	} else {
		router = (
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Redirect to="/signup" />
			</Switch>
		)
	}

	return router;
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkAuthState: () => dispatch(actions.checkAuthState()),
		setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
