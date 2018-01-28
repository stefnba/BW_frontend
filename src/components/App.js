import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Header from './layout/Header'

// Import pages for routing
import Home from './Home'
import Import from './import/Import'
import Transactions from './Transactions'

// Import authentification
import Login, { fakeAuth } from './auth/Login'



const App = () => (
	<div>
		<Switch>
			<AppRoute exact path="/" component={Home} />
			<PrivateRoute exact path='/import' component={Import} />
			<PrivateRoute exact path='/transactions' component={Transactions} />
			<Route exact path='/login' component={Login} />
		</Switch>
	</div>
)

// Create default layout
// adding header to each page by rendering multiple components  
const AppRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={matchPropos => (
			<div>
				<header><Header /></header>
				<main><Component {...matchPropos} /></main>
			</div>
		)} />
	);
};

// Add protected routes
// extends AppRoute to show pages only if logged in, otherwise login page redirect
const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<AppRoute {...rest} component={props => (
			fakeAuth.isAuthenticated === true
			? <Component {...props} /> 
			: (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
			)
		)} />
	);
};

export default App