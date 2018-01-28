import React from 'react'
import apiAuth from './auth/auth'

const Home = () => {
    return apiAuth.isAuthenticated() ? <div>Home private</div> : <div>Home public</div>
}

export default Home