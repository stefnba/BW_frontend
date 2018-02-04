import React from 'react'
import axios, { post } from 'axios'
import AccessAPI from '../api/api'

class ImportSelection extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            transactionsToImport: [],
            transactionsNotToImport: []
        };

        this.onSubmit = this.onSubmit.bind(this);        

    }

    componentDidMount() {  
        
        const importId = this.props.data.importID
        // const importId = '44F0867F8D504186B011'
        AccessAPI('/import/selection/' + importId).then((transactionsToImport) => {
            this.setState({ transactionsToImport })
        })
    }

    removeTransaction(id, e) {
        e.preventDefault();
        
        const tToRemove = this.state.transactionsToImport.find(item => item.import_id === id)
        
        this.setState({ transactionsNotToImport: this.state.transactionsNotToImport.concat(tToRemove) })
        this.setState({ transactionsToImport: this.state.transactionsToImport.filter(item => item.import_id !== id) })

    }

    addTransaction(id, e) {
        e.preventDefault();
        
        const tToAdd = this.state.transactionsNotToImport.find(item => item.import_id === id)
        
        this.setState({ transactionsToImport: this.state.transactionsToImport.concat(tToAdd) })
        this.setState({ transactionsNotToImport: this.state.transactionsNotToImport.filter(item => item.import_id !== id) })

    }

    onSubmit(e) {
        e.preventDefault();

        this.transactionsSubmit(this.state.transactionsToImport).then(res => (
            console.log(res)
        ))

        
    }

    transactionsSubmit(transactions) {

        return AccessAPI({
            method: 'post',
            api: '/import/create/',
            data: {
                'account': 1,
                'transactions': transactions
             }
        })
    }
    


    render() {
        return (
            <div>
                <button onClick={this.props.cancelImport}>Click me</button>

                <h1>Transactions to import</h1>
                <div>Transaction to import: {this.state.transactionsToImport.length}</div>

                <form onSubmit={this.onSubmit}>
                    <button type='submit'>Import</button>

                    <ul>
                        {this.state.transactionsToImport.map(t => (
                            <li key={t.import_id}>
                                <input value={t.date} readOnly />
                                <input value={t.description} readOnly />
                                <input value={t.amount_local} readOnly />
                                <input value={t.currency_local} readOnly />

                                <button onClick={this.removeTransaction.bind(this, t.import_id)}>Remove</button>
                            </li>
                            
                        ))}
                    </ul>
                </form>
                
                
                <h1>Transactions not to import</h1>
                <div>Transaction to import: {this.state.transactionsNotToImport.length}</div>
                <ul>
                    {this.state.transactionsNotToImport.map(t => (
                        <li key={t.import_id}>
                            <input value={t.date} readOnly />
                            <input value={t.description} readOnly />
                            <input value={t.amount_local} readOnly />
                            <input value={t.currency_local} readOnly />

                            <button onClick={this.addTransaction.bind(this, t.import_id)}>Add</button>
                        </li>
                        
                    ))}
                </ul>
                
            </div>
        )
    }
}

export default ImportSelection