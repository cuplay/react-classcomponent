import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import "./index.less";
import logo from "../../assets/image/head.jpg";
import menuList from "../../config/menuConfig";
import { setHeadTitle } from "../../redux/actions";
/* 
左侧导航的组件
 */
const { SubMenu } = Menu;
class LeftNav extends Component {
  // state = {
  //   current: "1",
  // };
  getMenuNodes_map = (menuList) => {
    // map加递归
    return menuList.map((item) => {
      /* 
      title
      key
      icon
      chilren 可能有 */
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  //查看item是否有授权
  hasAuth = (item) => {
    const key = item.key;
    const menus = this.props.user.role.menus;
    // 站视全部
    // const menus = ["/home", "/user", "/products", "/role", "/charts"];
    const username = this.props.user.username;
    // console.log(username)
    /*
    1.如果当前用户是admin,直接通过 
    2.如果当前item是公开的
    3.当前用户有此item的权限
     */
    if (username === "admin" || key === "./home" || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      //有一个子item的权限,
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }
    return false;
  };
  //改用reduce调用
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      //查看当前用户是否有item对应的权限
      if (this.hasAuth(item)) {
        //像pre中添加《item》或者《submenu》
        if (!item.children) {
          // 判断item是否是当前对应item
          if (item.key === path || path.indexOf(item.key) === 0) {
            //更新redux中的状态
            this.props.setHeadTitle(item.title);
          }
          pre.push(
            <Menu.Item key={item.key} icon={item.icon}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find(
            (cItem) => 0 === path.indexOf(cItem.key)
          );
          //如果存在，说明当前item的子列表需要打开
          if (cItem) {
            this.openkey = item.key;
          }

          pre.push(
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
      return pre; //记住return pre
    }, []);
  };
  handleClick = (e) => {
    // console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };
  //在第一次render之前执行一次，为第一次render准备数据（必须同步）
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  render() {
    // console.log(this)
    let path = this.props.location.pathname;
    // console.log(path)
    if (path.indexOf("/product") === 0) {
      //当前请求的是商品或其子路由界面
      path = "/product";
    }
    const openkey = this.openkey;
    // this.setState({current:path})
    return (
      <div>
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>河狸兽后台</h1>
        </Link>

        {/* <br />
        <br /> */}
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: 200 }}
          defaultOpenKeys={[openkey]}
          selectedKeys={[path]}
          mode="inline"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user }), { setHeadTitle })(
  withRouter(LeftNav)
);
