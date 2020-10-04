import React, { Component } from 'react'
import {
    NavBar, 
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
    Icon
 } from 'antd-mobile'

 import {connect} from 'react-redux'

 import { register } from '../../redux/actions'

import Logo from '../../components/logo/index.js'
import { Redirect } from 'react-router-dom'

const ListItem = List.Item


class Index extends Component {
    state = {
        username:'',
        password:'',
        confirm:'',
        type:'',
    }
    
    handleChange = (type,val) =>{
        this.setState(
            (prevState)=>{        
               return{[type]:val} 
        })
    }
    
    register = ()=>{
        this.props.register(this.state)
    }
    
    toLogin = () =>{
        this.props.history.replace('/login')
    }
    render() {
        const {msg, redirectTo} = this.props.user

        if(redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }
        return (       
            <div>
                <NavBar 
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                >Demo</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        { msg ? <div className='error-msg'></div>: null}
                        <WhiteSpace />
                        <InputItem onChange = { val =>{this.handleChange('username',val)}}>Username:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange = {val =>{this.handleChange('password',val)}} >Password:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange = {val =>{this.handleChange('comfirm',val)}}>Confirm:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>Type: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Radio checked = {this.state.type==='manager'} onChange = {val => this.handleChange('type','manager')}>manager</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked = {this.state.type==="employee"} onChange = {val => this.handleChange('type','employee')}>employee</Radio>
                        </ListItem>
                        <Button type="primary" onClick={this.register}>Register</Button>
                        <Button onClick={ this.toLogin }>Already registered</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}


export default connect(
    state => ({user:state.user}),
    {register}
)(Index)