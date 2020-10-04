import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types';
export default class HeaderSelector extends Component {
    state = {
        icon : null
    }
    
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    
    constructor(){
        super()
        this.headerList= []
        for( let i = 0; i<6;i++){
            this.headerList.push({
                text:'avatar'+(i+1),
                icon: require(`../../assets/images/ava${i+1}.jpg`)
            })
        }
    }
    
    handleClick = ({text,icon})=>{
        this.setState({
            icon:icon
        })
        this.props.setHeader(text)
    }
    
    
    render() {

        const listHeader = this.state.icon ? (<div><div >selected: </div><img src={this.state.icon} alt="avatar"></img></div>) : "select an avatar"
        return (
            <List
                renderHeader={ ()=> listHeader}
            > 
                <Grid data={this.headerList}
                    renderItem={dataItem => (
                        <div style={{ padding: '3px' }}>
                            <img src={dataItem.icon} style={{ width: '90px', height: '90px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}></div>
                        </div>
                    )}
                    onClick={this.handleClick}
                ></Grid>
            </List>
        )
    }
}
