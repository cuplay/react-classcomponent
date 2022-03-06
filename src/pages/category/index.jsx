import React, { Component } from "react";
import { Modal } from "antd";
import { Space, Card, Table, Button, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../component/link-button";
import {
  reqCategorys,
  reqUpdateCategory,
  reqAddCategory,
} from "../../api/index";
import AddForm from "./addform";
import UpdateForm from "./updateform";
import { withRouter } from 'react-router-dom'

class Category extends Component {
  state = {
    categorys: [],
    subCategorys: [], //二级分类列表
    loading: false,
    parentId: "0", //当前需要显示的分类ID
    parentName: "", //当前需要显示的分类名称
    showStatus: 0, //0都不显示,1显示更新,2显示添加
  };
  /*
  /* 異物获取一级或者耳机分类列表显示 */
  getCategorys = async () => {
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      //去除分类数组
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({ categorys });
      } else {
        this.setState({ subCategorys: categorys });
      }
      // console.log(categorys)
    } else {
      message.error("获取分类列表失败");
    }
  };
  /* 展现指定对象的子列表 */
  showSubCategory = (category) => {
    //更新状态时异步的
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        //在状态更新后重新render后执行
        this.getCategorys();
      }
    );
  };
  addCategotry = async () => {
    this.setState({ showStatus: 0 });
    //发请求更新分类
    // console.log(this.classes);
    // console.log(this.input);
    const parentId = this.classes.props.value;
    // console.log(categoryId)
    const categoryName = this.input.props.value;
    if(!categoryName){
      message.error('名称不能为空!')
      return
    }
    const result = await reqAddCategory(categoryName, parentId);
    // console.log(result);
    if (result.status === 0) {
      //重新显示列表
      if(!parentId){
        this.getCategorys();//重新获取当前分类列表
        message.success('添加成功')
      }
    }else{
      message.error('添加失败')
    }
  };
  //修改后更新列表
  updateCategory = async () => {
    //
    this.setState({ showStatus: 0 });
    //发请求更新分类
    const categoryId = this.category._id;
    // console.log(categoryId)
    const categoryName = this.form.state.value;
    if(!categoryName){
      message.error('名称不能为空!')
      return
    }
    // console.log(categoryName);
    const result = await reqUpdateCategory(categoryId, categoryName);
    // console.log(result)
    if (result.status === 200) {
      //重新显示列表
      this.getCategorys();
      message.success('修改成功')
    }else{
      message.error('修改失败')
    }
  };
  /* 准备数据 */
  componentWillMount() {
    // this.setState({parentId:'0'})
    // reqCategorys,reqUpdateCategory,reqAddCategory,
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        key: "action",
        dataIndex: "",
        render: (category) => (
          <span>
            <LinkButton
              onClick={() => {
                this.category = category;
                this.setState({ showStatus: 2 });
              }}
            >
              修改分类
            </LinkButton>{" "}
            {/* 如何向事件回调函数传递参数,定义一个回调函数 */}
            {this.state.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategory(category);
                }}
              >
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
  }

  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };
  /* 执行异步任务 */
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    //card左侧
    // console.log(this.props)
    //card右侧
    const extra = (
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          this.setState({ showStatus: 1 });
        }}
      >
        添加
      </Button>
    );
    const {
      parentId,
      categorys,
      subCategorys,
      parentName,
      showStatus,
    } = this.state;

    const category = this.category || {}; // 如果还没有,则空对象
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <Space>
          <LinkButton
            onClick={() => {
              this.setState(
                {
                  parentId: "0",
                  parentName: "",
                  subCategorys: [],
                },
                () => {
                  //在状态更新后重新render后执行
                  this.getCategorys();
                }
              );
            }}
          >
            一级分类列表
          </LinkButton>{" "}
          <ArrowRightOutlined /> {parentName}
        </Space>
      );
    // {console.log(this.columns)}
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          pagination={{ pageSize: 5
            // , total: 50 
          }}
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          loading={this.state.loading}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategotry}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AddForm
            categorys={categorys}
            categoryName
            setClasses={(classes) => {
              this.classes = classes;
            }}
            setInput={(input) => {
              this.input = input;
            }}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          destroyOnClose={true} //让对话框关闭时候清空输入值
          onOk={this.updateCategory}
        >
          <UpdateForm
            category={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}

export default withRouter(Category)