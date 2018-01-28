import React from 'react';
import axios from 'axios'

const AccessAPI = (endpoint, {api: api='/test', method: method='get', data: data=null, header: header={}} = {}) => {



    const urlServer = 'http://127.0.0.1:8000'


    
    const urlAPI = typeof endpoint === 'object' ? api : endpoint
    const headers = {
                'Authorization': 'Token d5c9cd8156427520d53a6d2f0d5d05f7e163d9f8',
                'Content-Type': 'application/json',
                ...header,
    }

    console.log(urlAPI);
    console.log(header)

    return new Promise((resolve, reject) => {
        axios({
            method: method, 
            url: urlServer + urlAPI,
            data: data,
            headers: headers
        })
        .then((response) => {
            resolve(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(`Status: ${error.response.status}; Text: ${error.response.statusText}; Detail: ${error.response.data.detail}`)
            alert('API call failed')
            resolve('API call failed')
            // reject('Failed')
        })
    })
}

export default AccessAPI