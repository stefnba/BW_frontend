import React from 'react'
import { Link } from 'react-router-dom'
import { AuthButton } from '../auth/Login'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/import'>Import</Link></li>
                <li><Link to='/transactions'>Transactions</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </nav>
        <AuthButton />
    </header>
)

export default Header