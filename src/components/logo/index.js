import React from 'react'
import './logo.css'
import logo from './logo.jpg'


export default function index() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img" />
        </div>
    )
}
