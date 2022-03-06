import { message } from 'antd';
// import 'antd/dist/antd.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Login from './pages/login'
import Admin from './pages/admin'

const history = createBrowserHistory();
export default class App extends Component {
  info = () => {
    message.info('This is a normal message');
  };
  render() {
    return (
      <Router history={history}>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Router>
    )
  }
}
