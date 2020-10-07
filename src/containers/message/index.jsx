import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief


const getLastMsgs = chatMsgs =>{
    const lastMsgObjs = {}

    chatMsgs.forEach(
        msg =>{
            let chatId = msg.chat_id
            let compareObj = null

            if( !(chatId in lastMsgObjs )){
                lastMsgObjs[chatId] = msg

            }else{
                compareObj = lastMsgObjs[chatId]

                if (msg.create_time > compareObj.create_time){
                    lastMsgObjs[chatId] = msg
                }
            }
        }
    )

    let lastMsgs = Object.values(lastMsgObjs)
    return lastMsgs
}

class Index extends Component {


    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        const lastMsgs = getLastMsgs(chatMsgs)
        return ( 
            <List style={{marginTop:45,marginBottom:50}}>
                {
                    lastMsgs.map(
                        (msg,index)=>{
                            const targetUser = msg.to===user.user_id ? users[msg.from] : users[msg.to]
                            const targetUserId = msg.to===user.user_id ? msg.from : msg.to
                            return (
                                <Item
                                    key={index}
                                    extra={<Badge text={0} />}
                                    thumb={targetUser.avatar ? require(`../../assets/images/${targetUser.avatar}.jpg`) : null}
                                    arrow='horizontal'
                                    onClick={ () => this.props.history.push(`/chat/${targetUserId}`)}
                                >
                                    {msg.content}
                                    <Brief>{targetUser.username}</Brief>
                                </Item>
                            )
                        }
                    )
                }
            </List>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Index)