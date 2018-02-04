import React from 'react';

class UploadForm extends React.Component {   

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} >
                <input name="file" type="file" onChange={this.props.handleChange} />

                <select name="account" value={this.props.data.select} onChange={this.props.handleChange}>
                    { this.props.data.accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>    
               
                <button type="submit">Import</button>
            </form>
        )
    }
}

export default UploadForm