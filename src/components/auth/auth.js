import axios, { post } from 'axios'

const apiAuth = {
	isAuthenticated() {
        if (localStorage.getItem('token') !== null) return true
        return false
    },
    
    authenticate(cb) {
        this.getToken('admin', 'adminadmin').then(res => {
            if (res.status === 200) {            
                localStorage.setItem('token', res.data.token)
                cb()
            }
            else {
                console.log("Login failed")
            }
        })
    },
    
    getToken(username, password) {
        const url = 'http://127.0.0.1:8000/api-token-auth/';
        const data = {
            username: username, 
            password: password
        }

        return post(url, data)
    },
    
    signout(cb) {
        localStorage.removeItem("token");
        setTimeout(cb, 100)
	}
}

export default apiAuth