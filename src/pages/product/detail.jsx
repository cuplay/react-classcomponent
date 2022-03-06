import React, { Component } from "react";
import { Card, List, Message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { reqCategory } from "../../api";

class Detail extends Component {
  state = {
    cName1: "",
    cName2: "",
  };
  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state.desc;
    if (pCategoryId === "0") {
      // 一级分类
      const result = await reqCategory(categoryId);
      if (result.status === 0) {
        const cName1 = result.name;
        this.setState({ cName1 });
      } else {
        Message.error("请求分类失败");
      }
    } else {

/*
一个一个发      
 const result1 = await reqCategory(categoryId);
      const result2 = await reqCategory(pCategoryId); */
    //   一次发动多个请求
    const results = await Promise.all([reqCategory(categoryId),reqCategory(pCategoryId)])
      if ((results[0].status === 0) & (results[1].status === 0)) {
        const cName1 = results[0].name;
        const cName2 = results[1].name;
        this.setState({ cName1, cName2 });
      } else {
        Message.error("请求分类失败");
      }
    }
  }
  render() {
    //读取携带过来的state
    const { name, desc, price, detail, imgs } = this.props.location.state.desc;
    const title = (
      <span>
        <RollbackOutlined onClick={() => this.props.history.goBack()} />{" "}
        商品详情
      </span>
    );
    const itemLayout = {
        labelCol:{span:6},
        wrapperCol:{span:5}
    }
    return (
      <Card title={title} >
        <List   {...itemLayout}>
          <List.Item>
            <span className="left">商品名称:</span>
            <span style={{ marginLeft: 0 }}>{name}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品价格:</span>
            <span>{price}</span>
          </List.Item>
          <List.Item>
            <span className="left">所属分类:</span>
            <span>
              {this.state.cName1}
              {this.state.cName2
                ? "-->" + this.state.cName2
                : this.state.cName1}
            </span>
          </List.Item>
          <List.Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map((img) => (
                img?
                <img
                  key={img.name}
                  className="product-img"
                  alt={img.name}
                  src={img.url}
                ></img>:''
              ))}
            </span>
          </List.Item>
          <List.Item style={{ float: "left" }}>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </List.Item>
        </List>
      </Card>
    );
  }
}
export default withRouter(Detail);
