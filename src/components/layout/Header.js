import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/import/'>Import</Link></li>
                <li><Link to='/transactions/'>Transactions</Link></li>
                <li><Link to='/logout/'>Logout</Link></li>
            </ul>
        </nav>
    </header>
)

export default Header