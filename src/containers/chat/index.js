import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'

const Item = List.Item

class Index extends Component {
    state = {
        content : ''
    }

    handleSend = () =>{
        let from = this.props.user.user_id;
        let to = this.props.match.params.userid
        let content = this.state.content.trim()

        if(content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:''})
    }

    handleChange = val =>{
        this.setState({content:val})
    }
    render() {
        return (
            <div className="chat-page">
                <NavBar>NavBar</NavBar>
                <List>
                    <Item thumb={require('../../assets/images/ava1.jpg')} > hello</Item>
                    <Item className="chat-me" extra="me" > hello</Item>
                </List>

                <div className ='am-tab-bar'>
                    <InputItem onChange={this.handleChange} value={this.state.content}  extra={<span onClick={this.handleSend}>SEND</span>}/>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({user:state.user}),
    {sendMsg}
)(Index)

