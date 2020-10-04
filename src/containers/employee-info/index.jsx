import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';

import HeaderSelect from '../../components/header-selector/index.js';

import {updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom';


class Index extends Component {

    state = {
        position:'employee',
        motto:'',
    }

    handleChange = (name,val) =>{
        this.setState({
            [name]: val
        })
    }

    setHeader = (avatar)=>{
        this.setState({
            avatar
        })
    }

    save = () =>{
        this.props.updateUser(this.state)
    }
    render() {
        const { avatar } = this.props.user
        if( avatar ){
            const path = avatar === null ? "/employeeinfo" : "/employee"
            return <Redirect to={path} ></Redirect>
        }
        return (
            <div>
                <NavBar>
                    Employee Info
                </NavBar>
                <HeaderSelect setHeader = {this.setHeader}/>
                <InputItem onChange={ val =>{this.handleChange('position',val)}}>Position: </InputItem>
                <TextareaItem title="Motto:" rows={3} onChange={ val =>{this.handleChange('motto',val)}} ></TextareaItem>
                <Button type='primary' onClick={this.save}> S&nbsp;A&nbsp;V&nbsp;E </Button>
            </div>
        )
    }
}

export default connect(
    state =>({user:state.user}),
    {updateUser}
)(Index)