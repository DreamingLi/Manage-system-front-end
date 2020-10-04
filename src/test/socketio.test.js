
import {w3cwebsocket as io } from 'websocket'

const client = new io('ws://127.0.0.1:8000/chat')

class Index {

    componentDidMount(){
        client.onopen = () =>{
            console.log('websocket client connected')
        }

        client.onmessage = message =>{
            console.log(message.data)
        } 
    }

}
