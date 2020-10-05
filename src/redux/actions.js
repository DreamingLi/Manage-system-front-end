
import { Toast } from 'antd-mobile';
import {w3cwebsocket as io } from 'websocket'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RESET_USER,
  RECEIVE_MSG_LIST, 
  RECEIVE_MSG
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  // reqReadMsg
} from '../api'


const receiveMsg = msg => ({type: RECEIVE_MSG, data: msg})

const initIO = (dispatch,user_id) =>{
    if(!io.socket){
      io.socket = new io('ws://127.0.0.1:8000/chat')
      io.socket.onmessage = (data) =>{
        dispatch(receiveMsg(JSON.parse(data.data)))
      }
      io.socket.onopen = ()=>{
        io.socket.send(str2jsonInit(user_id,250))  
        console.log("server channel connected")
      }

      io.socket.close = ()=>{
        console.log("disconnected")
      }
    }
}


const str2jsonMsg = (from,to,content,code) => `{"from":"${from}","to":"${to}","content":"${content}","code":"${code}"}`

const str2jsonInit = (id,code) => `{"id":"${id}","code":"${code}"}`

const getMsgList = async (dispatch,user_id) =>{
  const response = await reqChatMsgList()
  const result = JSON.parse(response.data)
  if(result.code===200){
    initIO(dispatch,user_id)
    const { users , chatMsgs } = result.data
    dispatch(receiveMsgList({users,chatMsgs}))
  }
}

const failToast = (msg) => { Toast.fail(msg, 2);}

const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

const errorMsg = msg => ({type: ERROR_MSG, data: msg})

const receiveUser = user => ({type:RECEIVE_USER, data: user})

export const resetUser = msg => ({type: RESET_USER, data:msg})

export const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST,data:userList})

const receiveMsgList = ({users,chatMsgs})=> ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}})



export const register = user => {
  const {username, password, comfirm, type} = user

  if(!username) {
    return errorMsg('username required')
  } else if(password!==comfirm) {
    return errorMsg('password must be the same')
  }
  return async dispatch => {
    const response = await reqRegister({username, password, type})
    if(response.data.code===200) {
      getMsgList(dispatch,response.data.user_id)
      dispatch(authSuccess(response.data))
    } else {     
        failToast(response.data.msg)
        dispatch(errorMsg(response.data.msg))
    }
  }
}

export const login = user => {

  const {username, password} = user

  if(!username) {
    return errorMsg('username required')
  } else if(!password) {
    return errorMsg('password required')
  }
  return async dispatch => {
    
    const response = await reqLogin(user)
    if(response.data.code===200) {
      getMsgList(dispatch,response.data.user_id)

      dispatch(authSuccess(response.data))
    } else { 
      failToast(response.data.msg)
      dispatch(errorMsg(response.data.msg))
    }
  }
}

export const updateUser = user =>{
  return async dispatch =>{
    const response = await reqUpdateUser(user)
    if(response.data.code===200){
      dispatch(receiveUser(response.data))
    } else { 
      failToast(response.data.msg)
      dispatch(resetUser(response.data.msg))
    }
  }
}

export const getUser = () =>{
  return async dispatch =>{
      const response = await reqUser()
      const result = response.data
      if(result.code===200){
        getMsgList(dispatch,result.data.user_id)

        dispatch(receiveUser(result.data))
      }else{
        dispatch(resetUser(result.msg))
      }
  }
}

export const getUserList = ()=>{
  return async dispatch =>{
    const response = await reqUserList()
    const result = response.data
    if(result.code===200){
      dispatch(receiveUserList(result.data))
    }
  }
}

export const sendMsg = ({from,to,content}) =>{
    return dispatch =>{
      // let msg = [from,to,content].join("_")
      io.socket.send(str2jsonMsg(from,to,content,200))

  }
}


