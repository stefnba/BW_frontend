import React from 'react'
import { Redirect } from 'react-router-dom'

import apiAuth from './auth'

const Logout = () => {
    apiAuth.signout();
    return <Redirect to='/' />
}

export default Logout