import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'



class Login extends React.Component {
	state = {
		redirectToReferrer: false
	}
	login = () => {
		fakeAuth.authenticate(() => {
			this.setState(() => ({
				redirectToReferrer: true
			}))
		})
	}
	
	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { redirectToReferrer } = this.state
		
		if (redirectToReferrer) {
			return (
				<Redirect to={from}/>
			)
		}

		return (
			<div>
				<p>You must be logged in to view this page</p>
				<button onClick={this.login}>Login</button>
			</div>
		)
	}
}

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated === true
    ? <p>
        Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
    </p>
    :
    <p>You're not logged in</p>
))

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
	  this.isAuthenticated = true
	  setTimeout(cb, 100) // fake async
	},
	signout(cb) {
	  this.isAuthenticated = false
	  setTimeout(cb, 100)
	}
};

export default Login
export { fakeAuth, AuthButton }