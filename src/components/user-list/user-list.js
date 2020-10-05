import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    WingBlank,
    WhiteSpace,
    Card
} from 'antd-mobile'
import { withRouter } from 'react-router-dom' 
const Header = Card.Header
const Body = Card.Body

 class Index extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props
        return (
            <div className="list-wrap">
                <WingBlank >
                    {
                        userList.map(user=>(
                            <div key = {user.id}>      
                                    <div>
                                        <WhiteSpace />
                                        <Card onClick={()=> this.props.history.push(`/chat/${user.id}`)}>
                                            <Header thumb={require(`../../assets/images/${user.avatar}.jpg`)} extra={user.username} />
                                            <Body>
                                                <div>Type: {user.type}</div>
                                                <div>Position: {user.position}</div>
                                            </Body>
                                        </Card>
                                    </div>
                                
                            </div>
                        ))
                    }
                </WingBlank>
            </div>
        )
    }
}
export default withRouter(Index)