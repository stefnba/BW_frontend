import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Import from './import/Import'
import Transactions from './Transactions'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/import' component={Import} />
            <Route exact path='/transactions' component={Transactions} />
        </Switch>
    </main>
)

export default Main