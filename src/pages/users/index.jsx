import React, { Component } from "react";
import { Button, Card, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "../../utils/constant";
import { formateDate } from "../../utils/dataUtils";
import LinkButton from "../../component/link-button";
import { reqDelUser, reqUsers, reqAddOrUpdateUser } from "../../api";
import UserForm from "./user-form";
export default class Users extends Component {
  state = {
    users: [], //所有用户列表
    showStatus: 0,
    roles: [],
    user: {},
  };
  constructor(props) {
    super(props);
    this.us = React.createRef();
  }
  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: (create_time) => formateDate(create_time),
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: (role_id) =>
          // {
          //     const role=this.state.roles.find(role=>role._id===role_id)
          //     return role?role.name:''}
          //防止反复生成
          this.roleNames[role_id],
      },
      {
        title: "操作",
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        ),
      },
    ];
  };
  /* 根据role数据,生成包含所有角色名的对象 */
  initRoles = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name ? role.name : "";
      return pre;
    }, []);
  };
  /* 删除指定用户 */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,

      onOk: async () => {
        const result = await reqDelUser(user._id);
        if (result.status === 0) {
          message.success("删除用户成功!");
          this.getUsers();
        } else {
          message.error("删除用户失败!");
        }
      },
    });
  };
  /* 获取用户列表 */
  getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.initRoles(roles);
      this.setState({ users, roles });
    } else {
      message.error("获取角色列表失败");
    }
  };
  addOrUpdateuser = async () => {
    //收集数据
    let user = this.us.current.addOrUpdateUser();
    user.create_time = Date.now();
    if (this.state.user._id) {
      user._id = this.state.user._id;
    }
    //   2.提交添加的请求
    const result = await reqAddOrUpdateUser(user);
    // 3.更新列表显示
    if (result.status === 0) {
      message.success(`${this.state.user._id?'修改':'添加'}角色成功`);
      this.getUsers();
      this.setState({ showStatus: 0 });
    } else {
      message.error(`${this.state.user._id?'修改':'添加'}角色失败`);
    }
    // //console.log(user);
  };
  showUpdate = (user) => {
    this.setState({ showStatus: 1,user:user });
  };
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getUsers();
  }
  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };
  render() {
    const { users, showStatus, roles } = this.state;
    ////console.log(users);
    const title = (
      <Button
        type="primary"
        onClick={() => {
          this.setState({ showStatus: 1, user: {} });
        }}
      >
        创建用户
      </Button>
    );
    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={users}
          columns={this.columns}
          bordered
        />
        <Modal
          title={this.state.user._id ? "修改用户" : "添加用户"}
          visible={showStatus === 1}
          onOk={this.addOrUpdateuser}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <UserForm roles={roles} ref={this.us} user={this.state.user} />
        </Modal>
      </Card>
    );
  }
}
