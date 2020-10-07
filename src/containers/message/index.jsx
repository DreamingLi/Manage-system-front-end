import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import { createImportSpecifier } from 'typescript'

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
                console.log(compareObj)
                console.log(msg.create_time , compareObj.create_time)
                if (msg.create_time > compareObj.create_time){
 
                    lastMsgObjs[chatId] = msg
                }
            }
        }
    )
    console.log(lastMsgObjs)

// const lastMsgs = Object.values(lastMsgObjs)
// lastMsgs.sort( 
//     (m1,m2) => m2.create_time - m1.create_time
// )
//     return lastMsgs
}

class Index extends Component {




    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        const lastMsgs = getLastMsgs(chatMsgs)
        return ( <div></div>
            // <List style={{marginTop:45,marginBottom:50}}>
            //     {
            //         lastMsgs.map(
            //             (msg,index)=>(
            //                 <Item
            //                     key={index}
            //                     extra={<Badge text={0} />}
            //                     thumb={msg.avatar ? require(`../../assets/images/${msg.avatar}.jpg`) : null}
            //                     arrow='horizontal'
            //                 >
            //         {msg.content}
            //         <Brief>{users[msg.to===user.user_id ? msg.from: msg.to]}</Brief>
            //     </Item>
            //             )
            //         )
            //     }
            // </List>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Index)