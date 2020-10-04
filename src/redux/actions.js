
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
  reqReadMsg
} from '../api'

const initIO = ()=>{
  if(!io.socket){
    io.socket = io('ws://127.0.0.1:8000/chat')
    io.socket.onmessage = (data)=>{
      console.log(JSON.parse(data.data))
    }
  }
}

const str2json = (from,to,content) => `{"from":"${from}","to":"${to}","content":"${content}"}`

const getMsgList = async (dispatch) =>{
  initIO()
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0){
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
    console.log(response.data)
    if(response.data.code===200) {
      getMsgList(dispatch)
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
      // getMsgList(dispatch)
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
        getMsgList(dispatch)
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
      io.socket.send(str2json(from,to,content))
  }
}

