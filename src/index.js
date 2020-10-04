import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter,Route,Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Register from './containers/register/index.jsx'
import Login from './containers/login/index.jsx'
import Main from './containers/main/index.jsx'

import './assets/css/index.css'


export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route component={Main}></Route>
                    </Switch>
                </HashRouter>
            </Provider>

        )
    }
}

ReactDOM.render(<Index />,document.getElementById('root'))