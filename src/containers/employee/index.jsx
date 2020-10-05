import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list.js'

 class Index extends Component {
    //  componentDidMount(){
    //      this.props.getUserList()
    //  }

    render() {
        return (
            <div>
                <UserList userList={this.props.userList} />
            </div>
        )
    }
}

export default connect(
    state => ({userList : state.userList}),
    {getUserList}
)(Index)