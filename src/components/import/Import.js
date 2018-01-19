import React from 'react'
import axios, { post } from 'axios'

import ImportQuery from './ImportQuery'
import UploadForm from './UploadForm'

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
        
        
        this.fileUpload(this.state.file).then((response) => {
          console.log(response.data)  
        })
    }

    cancelImport(event) {
        this.setState({ isSubmitted: false });
    }

    componentDidMount() {
        axios.get('/accounts.json')
            .then(res => {
                const accounts0 = res.data;
                const accounts = [{
                    "id": 1,
                    "name": "New York11"
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
                
                const account = accounts[0].id
                this.setState({ accounts, account })

            });
    }

    fileUpload(file) {
      
      console.log(file)
      const url = '';
      const formData = new FormData();
      
      formData.append('file', file)
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