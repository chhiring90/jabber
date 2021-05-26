import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import SignUp from './containers/Signup';

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" component={SignUp} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
