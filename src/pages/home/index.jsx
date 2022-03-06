import React, { Component } from "react";
import { Card, Statistic,Timeline } from "antd";
import "./index.less";
export default class Home extends Component {
  state = {
    isVisited: true,
  };
  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };
  render() {
    return (
      <div  className="home">
        <Card
          className="home-card"
          title="商品总量"
          //   extra={
          //     <Icon style={{ color: "rgba(0,0,0,.45)" }} type="question-circle" />
          //   }
          headStyle={{ color: "rgba(0,0,0,.45)" }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            style={{ fontWeight: "bolder" }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix={"周同比"}
            suffix={
              <div>
                %
                {/* <Icon
                  style={{ color: "red", marginLeft: 10 }}
                  type="arrow-down"
                /> */}
              </div>
            }
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={"日同比"}
            suffix={
              <div>
                {/* %
                <Icon
                  style={{ color: "#3f8600", marginLeft: 10 }}
                  type="arrow-up"
                /> */}
              </div>
            }
          />
        </Card>
        <Card className='home-center'>
            <span>欢迎使用河狸兽后台管理系统</span>
        </Card>
        <Card
          title="任务"
          className="home-table-right"
          //   extra={<Icon  />}
        >
          <Timeline>
            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
            <Timeline.Item color="red">
              <p>联调接口</p>
              <p>功能验收</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>登录功能设计</p>
              <p>权限验证</p>
              <p>页面排版</p>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    );
  }
}
