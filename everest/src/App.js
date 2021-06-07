import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import UserDashboard from './containers/UserDashboard';
import * as actions from './stores/actions/index';

function App(props) {

	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		props.checkAuthState();
		setIsAuth(props.isAuthenticated);
		
		return () => {
			if(!isAuth){
				props.setAuthPathRedirect();
			}
		}
	}, [isAuth, props]);

	let router;

	if (isAuth) {
		router = (
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/" exact component={UserDashboard} />
			</Switch>
		);
	} else {
		router = (
			<Switch>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Redirect to="/signup"/>
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
		checkAuthState: () => dispatch(actions.checkAuthState()),
		setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
