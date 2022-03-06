import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import storageUtils from "./utils/storageUtils";
import {receiveUser} from './redux/actions'
//读取local中保存的user,保存到内存中
receiveUser(storageUtils.getUser()); 
console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
store.subscribe(()=>{
    console.log('组件更新')
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("root")
      );
})

  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
