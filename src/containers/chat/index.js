import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
import { sendMsg} from '../../redux/actions'

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

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(nextProps,nextState)
    //     return true
    // }

    handleKey = e =>{
        console.log(e)
    }
    render() {
 
        const { user } = this.props
        const { userList } = this.props
        const targetID = this.props.match.params.userid
        const chatID = [user.user_id,targetID].sort().join('_')
   
        const msgs = this.props.chat.chatMsgs ? this.props.chat.chatMsgs.filter(msg=>msg.chat_id===chatID) : []
 
        const target = userList.length > 0 ? userList.filter(user => user.id===parseInt(targetID))[0] : {"avatar":null}

        const targetAvatarIcon = target.avatar ? require(`../../assets/images/${target.avatar}.jpg`) : null

        return ( 
            <div className="chat-page">
                <NavBar className = "chat-navbar">{target.username}</NavBar>
                <div className="chat-display">
                    <List  >
                        {
                            msgs.map( (msg , index) =>{
                                if(parseInt(msg.to) === user.user_id){ 
                                return <Item key={index} thumb={targetAvatarIcon} multipleLine={true} wrap={true}>{msg.content}</Item>
                                }else{
                                    return <Item key={index} className="chat-me" extra="me" multipleLine={true} wrap={true}>{msg.content}</Item>
                                }
                            })
                        }
                    </List>
                </div>
                <div className ='am-tab-bar'>
                    <InputItem onChange={this.handleChange} value={this.state.content}  extra={<span onClick={this.handleSend}>SEND</span>}/>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({user:state.user, chat: state.chat, userList: state.userList}),
    {sendMsg}
)(Index)

