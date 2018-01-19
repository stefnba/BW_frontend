import React from 'react'

class ImportQuery extends React.Component {    
    
    render() {
        return (
            <div>
                <button onClick={this.props.cancelImport}>Click me</button>
                {this.props.data.account}
                
            </div>
        )
    }
}

export default ImportQuery