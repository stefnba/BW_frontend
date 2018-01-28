import React from 'react'
import axios, { post } from 'axios'

class ImportQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            test: []
        };
       
    }

    componentDidMount() {
        axios({
            method: 'get', 
            url: 'http://127.0.0.1:8000/api/',
            headers: {
                'Authorization': 'Token d5c9cd8156427520d53a6d2f0d5d05f7e163d9f8',
                'Content-Type': 'application/json',
            }
        }).then(res => {
                console.log(res)
                this.setState({test: res.data})
            });
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