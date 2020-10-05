import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types';
export default class HeaderSelector extends Component {
    state = {
        avatar : null
    }
    
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    
    constructor(){
        super()
        this.headerList= []
        for( let i = 0; i<4;i++){
            this.headerList.push({
                text:'avatar'+(i+1),
                avatar: require(`../../assets/images/avatar${i+1}.jpg`)
            })
        }
    }
    
    handleClick = ({text,avatar})=>{
        this.setState({
            avatar:avatar
        })
        this.props.setHeader(text)
    }
    
    
    render() {

        const listHeader = this.state.avatar ? (<div><div >selected: </div><img src={this.state.avatar} alt="avatar"></img></div>) : "select an avatar"
        return (
            <List
                renderHeader={ ()=> listHeader}
            > 
                <Grid data={this.headerList}
                    renderItem={dataItem => (
                        <div style={{ padding: '3px' }}>
                            <img src={dataItem.avatar} style={{ width: '90px', height: '90px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}></div>
                        </div>
                    )}
                    onClick={this.handleClick}
                ></Grid>
            </List>
        )
    }
}
