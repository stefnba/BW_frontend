import React from 'react'
import axios, { post } from 'axios'
import AccessAPI from '../api/Api'

class ImportQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            test: []
        };
       
    }


    componentDidMount() {  
        // AccessAPI({ api: '/test'}).then((data) => this.setState({ test: data }))
        AccessAPI({ api: '/test', header: {'test': 123}}).then((data) => this.setState({ test: data }))
        // AccessAPI('/test').then((data) => this.setState({ test: data }))
    }
    
    render() {
        return (
            <div>
                <button onClick={this.props.cancelImport}>Click me</button>
                {this.state.test.map(t => (
                    <li key={t.id}>{t.user}</li>
                ))}
                
            </div>
        )
    }
}

export default ImportQuery