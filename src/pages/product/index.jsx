import React, { Component } from 'react'
import { Route, Switch,  Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail'
import AddUpdate from './add-update'
import './index.less'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={Home} exact></Route>
                <Route path='/product/detail' component={Detail}></Route>
                <Route path='/product/addupdate' component={AddUpdate}></Route>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}
