import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import ManagerInfo from '../manager-info/index.jsx'
import EmployeeInfo from '../employee-info/index.jsx'
import {connect} from "react-redux"
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils/index.js'
import { getUser } from '../../redux/actions'
import Manager from '../manager/index.jsx'
import Employee from '../employee/index.jsx'
import Message  from '../message'
import Personal from '../personal/index.jsx'
import Error from '../../components/error'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/index.jsx'
import Task from '../task/index.jsx'
import Chat from '../chat/index.js'

class index extends Component {
    navList = [
        {
            path:"/employee",
            component: Employee,
            title:'Employee',
            icon:"employee",
            text:"Employee"
        },
        {
            path:"/manager",
            component: Manager,
            title:'Manager',
            icon:"manager",
            text:"Manager"
        },
        {
            path:"/task",
            component: Task,
            title:'Task',
            icon:'task',
            text:'task'
        },
        {
            path:"/message",
            component: Message,
            title:'Message',
            icon:"message",
            text:"Message"
        },
        {
            path:"/profile",
            component: Personal,
            title:'Profile',
            icon:"profile",
            text:"Profile"
        },

    ]
    // componentDidMount(){
    //     let userid = Cookies.get('userid')
    //     const {user_id} = this.props.user
    //     if ( userid && !user_id){
    //         this.props.getUser()
    //     }
    // }

    render() {
        //get userid from cookies

        const userid = Cookies.get('userid')

        if (!userid){
            return <Redirect to="/login"/>
        }

        // //get user state from redux
        const {user} = this.props
        // console.log(user) {user_id: "0", username: "test", type: "employee", avatar: "ava0", position: "manager", …}
        if(!user.user_id){
            return <Redirect to="/login"/>
        }
        else
        {
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(user.type,user.avatar)
                return <Redirect to={path}/>    
            }
        }


        const {navList} = this
        const path = this.props.location.pathname
 
        const currentNav = navList.find(nav=>nav.path===path)
      

        if(currentNav){
            if(user.type==="manager"){
                navList[0].hide = true
  
            }else{
                navList[1].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className="top-bar">{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map( (nav,index) => <Route key={index} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/managerinfo' component={ManagerInfo}/>
                    <Route path='/employeeinfo' component={EmployeeInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component = {Error}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
        )
    }
}
export default  connect(
    state =>({user: state.user}),
    {getUser}
)(index)