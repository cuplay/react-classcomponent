import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined, CloudOutlined } from "@ant-design/icons";

import "./index.less";
import { reqWeather } from "../../api/index";
import { formateDate } from "../../utils/dataUtils";
import LinkButton from "../link-button";
import { logout } from "../../redux/actions";
const { confirm } = Modal;
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weather: "",
  };
  getTime = () => {
    this.a = setInterval(() => {
      this.setState({ currentTime: formateDate(Date.now()) });
    }, 1000);
  };
  getWeather = async () => {
    // console.log(reqWeather('杭州'))
    const { weather } = await reqWeather("杭州");
    // console.log(weather)
    this.setState({ weather });
  };
  //退出登陆
  logout = () => {
    //显示确认框
    // console.log(history)
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确定退出登陆吗?",

      onOk: () => {
        // console.log(this);
        // 删除数据
        // 跳转到login
        this.props.logout();
      },
      onCancel: () => {
        console.log("取消");
      },
    });
  };

  /* 第一次render后立即执行 */
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  componentWillUnmount() {
    clearInterval(this.a);
  }
  render() {
    const { currentTime, weather } = this.state;
    const user = this.props.user.username;
    //显示当前的title
    const title = this.props.headTitle;
    // console.log('title',title)
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user} </span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>{title}</span>
          </div>
          <div className="header-bottom-right">
            <span>{currentTime} </span>
            <CloudOutlined
              style={{ width: "30px", height: "20px", margin: "15 15 15 15" }}
            />
            <span>{weather} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ headTitle: state.headTitle, user: state.user }),
  { logout }
)(withRouter(Header));
