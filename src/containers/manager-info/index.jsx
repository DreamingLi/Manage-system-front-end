import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'

import HeaderSelect from '../../components/header-selector/index.js'
import { updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom'

class Index extends Component {
    state = {
        position:'manager',
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
            const path = avatar === null ? "/managerinfo" : "/manager"
            return < Redirect to={path} ></Redirect> 
        }
        return (
            <div>
                <NavBar>
                    Manager Info
                </NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem onChange={ val =>{this.handleChange('position_type',val)}}>Position: </InputItem>
                <TextareaItem title="motto" rows={3} onChange={ val =>{this.handleChange('motto',val)}} >Motto: </TextareaItem>
                <Button type='primary' onClick={this.save}> S&nbsp;A&nbsp;V&nbsp;E </Button>
            </div>
        )
    }
}

export default connect(
    // 需要的数据，放到props里面
    state =>({user: state.user}),
    // 把哪个方法作为props向下传递
    {updateUser}
)(Index)