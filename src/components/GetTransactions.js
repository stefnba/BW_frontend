import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class FetchTransactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {        
        axios.get(`https://api.fixer.io/2000-01-03?base=USD&symbols=EUR`)
            .then(res => {
                const posts = res.data;
                console.log(posts)
                this.setState({ posts });
            });
    }

    render() {
        return (
            <div>
              
                  { this.state.posts.base }
                  { this.state.posts.date }

                 
            </div>
        );
    }
}

export default FetchTransactions