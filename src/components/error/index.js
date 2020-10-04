import { Button } from 'antd-mobile'
import React, { Component } from 'react'

export default class Error extends Component {
    render() {

        return (
            <div>
                <h2>404, Sorry, we lost the page</h2>
                <Button type="primary" onClick={ ()=> this.props.history.replace("/login")}>Back to the home page</Button>
            </div>
        )
    }
}
 