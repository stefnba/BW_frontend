import React from 'react'
import axios, { post } from 'axios'

import ImportQuery from './ImportQuery'
import UploadForm from './UploadForm'


const accounts = [{
            "id": 1,
            "name": "New Branch"
        }, 
        {
            "id": 2,
            "name": "Los Angeles"
        },
        {
            "id": 3,
            "name": "Frankfurt"
        }
    ]

class ImportForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isSubmitted: false,
            account: null,
            file: null,
            accounts: [] 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelImport = this.cancelImport.bind(this);        
    }

    handleChange(event) {
      const stateToSet = event.target.name === "account" ? event.target.value : event.target.files[0];
      this.setState({ [event.target.name]: event.target.name === "account" ? event.target.value : event.target.files[0] })        
    }

    handleSubmit(event) {
        this.setState({ isSubmitted: true })
        event.preventDefault();

        // this.fileUpload(this.state.file, this.state.account).then((response) => {
        //   console.log(response.data)  
        // })
    }

    cancelImport(event) {
        this.setState({ isSubmitted: false });
    }

    Test() {
        axios.get('http://127.0.0.1:8000/').then(res => {
            console.log(res)
        })
    }

    componentDidMount() {
        axios.get('/accounts.json')
            .then(res => {
                const accounts0 = res.data;
                
                // Set account state
                const account = accounts[0].id
                this.setState({ accounts, account })

            });
    }

    fileUpload(file, account) {

        const url = 'http://127.0.0.1:8000/';
        const formData = new FormData();
      
        formData.append('file', file)
        formData.append('account', account)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {    
        return this.state.isSubmitted ? <ImportQuery data={this.state} cancelImport={this.cancelImport} /> : <UploadForm data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    }
}

export default ImportForm