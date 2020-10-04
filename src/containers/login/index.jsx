import React, { Component } from 'react'
import {
    NavBar, 
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button,
    Icon
 } from 'antd-mobile'
import Logo from '../../components/logo/index.js'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

 class Login extends Component {
    state = {
        username:'',
        password:''
    }

    toRegister = ()=>{
        this.props.history.replace('/register')
    }
    
    changeHandle = (type,val) =>{
        this.setState(
            (prevState)=>{
                return {
                    [type]:val
                }
            }
        )
    }

    login = () =>{
        this.props.login(this.state)
    }



    render() {
        const {user_id,type} = this.props.user 
        const path = type==="manager" ? "/manager" : "/employee"
        if(user_id){
            return <Redirect to={path} />
        }
        return (
            <div>
            
            <NavBar 
            mode="dark"
            onLeftClick={() => console.log('onLeftClick')}
            >Demo</NavBar>
            <Logo/>

            <WingBlank>
                <List>
                    <WhiteSpace />
                    <InputItem onChange={val => {this.changeHandle('username',val)}}>Username:</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={ val=>{this.changeHandle('password',val)}}>Password:</InputItem>
                    <WhiteSpace />
                    <Button type="primary" onClick= {this.login}>Login</Button>
                    <Button onClick = {this.toRegister }>Not registered yet?</Button>
                </List>
            </WingBlank>
        </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)