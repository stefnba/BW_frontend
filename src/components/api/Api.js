import axios from 'axios'

const AccessAPI = (par) => {

    const isF = typeof par !== 'object' ? true : false
    const urlServer = 'http://127.0.0.1:8000'
    const defaultHeaders = {
        'Authorization': 'Token d5c9cd8156427520d53a6d2f0d5d05f7e163d9f8',
        'Content-Type': 'application/json',
    }
    const meta = {
        url: isF ? par : par.api,
        method: isF ? 'get' : par.method || 'get',
        headers: isF ? defaultHeaders : { ...par.header, ...defaultHeaders} || defaultHeaders,
        data: isF ? null : par.data || null
    }

    return new Promise((resolve, reject) => {
        axios({
            method: meta.method, 
            url: urlServer + meta.url,
            data: meta.data,
            headers: meta.headers
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