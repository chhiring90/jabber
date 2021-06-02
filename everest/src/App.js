import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import UserDashboard from './containers/UserDashboard';

function App() {
	return (
		<>
			<Switch>
				<Route path="/" exact component={UserDashboard} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
			</Switch>
		</>
	);
}

export default App;
