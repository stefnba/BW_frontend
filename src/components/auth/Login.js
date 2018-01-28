import React from 'react'
import { Redirect } from 'react-router-dom'
import apiAuth from './auth'

class Login extends React.Component {
	state = {
		redirectToReferrer: false
	}
	login = () => {
		apiAuth.authenticate(() => {
			this.setState(() => ({
				redirectToReferrer: true
			}))
		})
	}
	
	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { redirectToReferrer } = this.state
		
		if (redirectToReferrer) return <Redirect to={from}/>

		return (
			<div>
				<p>You must be logged in to view this page</p>
				<button onClick={this.login}>Login</button>
			</div>
		)
	}
}

export default Login