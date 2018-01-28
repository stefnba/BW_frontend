import React from 'react'

import Header from './Header'
import Main from './Main'

import Home from './Home'
import Import from './import/Import'
import Transactions from './Transactions'

import { Switch, Route } from 'react-router-dom'

const App = () => (
	<div>
		<Switch>
			<AppRoute exact path="/" component={Home} />
			<AppRoute exact path='/import' component={Import} />
			<AppRoute exact path='/transactions' component={Transactions} />
		</Switch>

	
	</div>
	)

// Create default layout
// Adding header to each page by rendering multiple components  
const AppRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={matchPropos => (
			<div>
				<header><Header /></header>
				<main><Component {...matchPropos} /></main>
			</div>
		)} />
	)
}

export default App