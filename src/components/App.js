import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Header from './layout/Header'
import HeaderPublic from './layout/HeaderPublic'

// Pages for routing
import Home from './Home'
import Import from './import/Import'
import Transactions from './Transactions'

// Authentification
import Login from './auth/Login'
import Logout from './auth/Logout'
import apiAuth from './auth/auth'


// ROUTING COMPONENT
const App = () => (
	<div>
		<Switch>
			<AppRoute exact path="/" component={Home} />
			<PrivateRoute exact path='/import' component={Import} />
			<PrivateRoute exact path='/transactions' component={Transactions} />
			<Route exact path='/logout' component={Logout} />
			<Route exact path='/login' component={Login} />
		</Switch>
	</div>
)

// DEFAULT LAYOUT
// adding header to each page by rendering multiple components  
const AppRoute = ({ component: Component, ...rest }) => {
	const header = apiAuth.isAuthenticated() ? <Header /> : <HeaderPublic />

	return (
		<Route {...rest} render={matchPropos => (
			<div>
				{header}
				<main><Component {...matchPropos} /></main>
			</div>
		)} />
	);
};

// PROTECTED ROUTES
// extends AppRoute to show pages only if logged in, otherwise login page redirect
const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<AppRoute {...rest} component={props => (
			apiAuth.isAuthenticated()
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