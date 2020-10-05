
import ajax from './ajax.js'

export const reqRegister = data => ajax('/api/user/register',data,"POST")

export const reqLogin = data => ajax('/api/user/login',data,"POST")

export const reqUpdateUser = data => ajax('/api/user/update',data,"POST")

export const reqUser = () => ajax('/api/user/info')

export const reqUserList = () => ajax('/api/user/list')


export const reqChatMsgList = () => ajax('/api/chat/listMsg')

export const reqReadMsg = (from) => ajax('api/chat/read',{from},"POST")
