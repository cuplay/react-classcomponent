import React, { Component } from "react";
import { Message, Card, Select, Input, Button, Table, message } from "antd";
import {} from "@ant-design/icons";
import LinkButton from "../../component/link-button";
import { reqProducts, reqProductsSearch,reqUpdateStatus } from "../../api/";
import { PAGE_SIZE } from "../../utils/constant";
/* 默认字路由 */
const Option = Select.Option;
export default class Home extends Component {
  state = {
    products: [],
    total: 0,
    loading: false,
    searchName: "",
    searchType: "productName",/* 受控组件 */
    
  };
  /* 获取指定页码的料表数据 */
  getProducts = async (pageNum) => {
      this.pageNum=pageNum
    const { searchType, searchName } = this.state;
    this.setState({ loading: true });
    let result;
    /* 实现一个函数实现两种请求 */
    if (searchName !=='') {
      result = await reqProductsSearch(
        pageNum,
        PAGE_SIZE,
        searchName,
        searchType
      );
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    this.setState({ loading: false });
    if (result.status === 0) {
      this.setState({
        products: result.data.list,
        total: result.data.total,
      });
    } else {
      Message.error("请求失败，请稍后重试");
    }
  };

  UNSAFE_componentWillMount() {
    this.columns = [
      {
        width: 200,
        title: "商品名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "desc",
      },
      {
        width: 100,
        title: "价格",
        dataIndex: "price",
        key: "price",
        render: (price) => "￥" + price,
      },
      {
        width: 150,
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status,_id) => {
        const newStatus = status ===1?2:1
          return  (
            <span>
              <Button type="primary" onClick={()=>this.updateStatus(_id,newStatus)}>{status===1?'下架':'上架'}</Button>
              <span>{status===1?'在售':'已下架'}</span>
            </span>
          )  
        },
      },
      {
        width: 100,
        title: "操作",
        dataIndex: "name,desc,price,detail,imgs",
        key: "action",
        render: (name,desc,price,detail,imgs,categoryId,pCategoryId) => {
          return (
            <span>
              <LinkButton onClick={()=>this.props.history.push('/product/detail',{desc})}>详情</LinkButton>
              <LinkButton onClick={()=>this.props.history.push('/product/addupdate',{desc})}>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  }
   updateStatus = async (productId,status)=>{
    const result = await reqUpdateStatus(productId,status);
    // console.log(result)
    if(result.status===0){
        message.success('更新商品成功')
        this.getProducts(this.pageNum)
    }else{
        message.error('更新商品失败')
    }

  }
  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { searchType } = this.state;
    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 200 }}
          placeholder="关键字"
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    );
    const extra = <button onClick={()=>{this.props.history.push('/product/addupdate')}}>添加</button>;

    return (
      <Card title={title} extra={extra} className="product">
        <Table
          loading={this.state.loading}
          pagination={{
            current:this.pageNum,  //跳转
            total: this.state.total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: (pageNum) => {
              this.getProducts(pageNum);
            },
          }}
          bordered
          rowKey="_id"
          dataSource={this.state.products}
          columns={this.columns}
        />
      </Card>
    );
  }
}
