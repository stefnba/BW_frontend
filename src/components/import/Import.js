import React from 'react'
import axios, { post } from 'axios'

import AccessAPI from '../api/api'

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
        
        event.preventDefault();

        this.fileUpload(this.state.file, this.state.account).then( response => {
            console.log(response)
            this.setState({ isSubmitted: true })
        })
    }

    cancelImport(event) {
        this.setState({ isSubmitted: false });
    }

    componentDidMount() {
        
        AccessAPI('/accounts/list/').then((data) => {
            this.setState({ accounts: data, account: data[0]['id']})
        })
    }

    fileUpload(file, account) {

        const formData = new FormData();
        formData.append('docfile', file)
        formData.append('account', account)       

        return AccessAPI({
            method: 'post',
            api: '/import/upload/', 
            header: {
                'content-type': 'multipart/form-data'
            }, 
            data: formData
        })
    }

    render() {    
        return this.state.isSubmitted ? <ImportQuery data={this.state} cancelImport={this.cancelImport} /> : <UploadForm data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    }
}

export default ImportForm