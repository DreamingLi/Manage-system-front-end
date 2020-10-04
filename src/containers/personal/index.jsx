import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List,WhiteSpace, Button, Modal} from 'antd-mobile'
import  Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

const Item = List.Item
const Breif = Item.Brief

class Index extends Component {

    logout = ()=>{
        Modal.alert('Exit','Do you want to Exit ?',[
            {text:'Cancel'},
            {text:'Confirm',
                onPress: ()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {username,position,avatar,type,motto} = this.props.user

        return (
            <div style={{marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/${avatar}.jpg`)} style={{width:75}} alt = "avatar" />}
                    title = {username}
                    message = {type}
                >
                </Result>
                <List renderHeader={ () =>'Info'}>
                    <Item multipleLine>
                        <Breif>Position: &nbsp;&nbsp;{position}</Breif>
                        <Breif>Motto: &nbsp;&nbsp;{motto}</Breif>
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type="warning" onClick={this.logout}>Exit</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Index)