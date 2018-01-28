import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Header from './layout/Header'

// Import pages for routing
import Home from './Home'
import Import from './import/Import'
import Transactions from './Transactions'
// import Redirect from 'react-router-dom/Redirect';


const App = () => (
	<div>
		<Switch>
			<AppRoute exact path="/" component={Home} />
			<PrivateRoute exact path='/import' component={Import} />
			<AppRoute exact path='/transactions' component={Transactions} />
			<Route exact path='/login' component={Login} />
		</Switch>
	</div>
)

const fakeAuth = {
	isAuthenticated: true,
	authenticate(cb) {
	  this.isAuthenticated = true
	  setTimeout(cb, 100) // fake async
	},
	signout(cb) {
	  this.isAuthenticated = false
	  setTimeout(cb, 100)
	}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		fakeAuth.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
	)} />
)

  
class Login extends React.Component {
	render() {
		return (
			<div>Login</div>
		)
	}
}



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