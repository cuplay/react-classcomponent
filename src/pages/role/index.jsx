import React, { Component, } from "react";
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, message } from "antd";

import { PAGE_SIZE } from "../../utils/constant";
import { reqRoleList, reqAddRole ,reqUpdateRole} from "../../api";
import AddForm from "./add-form.jsx";
import SetTree from "./setTree";
import {formateDate} from '../../utils/dataUtils'
import { logout } from "../../redux/actions";
/* 角色路由 */
 class Role extends Component {
  state = {
    loading: false,
    roles: [],
    role: {},
    showStatus: 0,
  };
  constructor(props){
      super(props)
      this.auth= React.createRef()
  }
  getRoles = async () => {
    const result = await reqRoleList();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({
        roles,
      });
    }
  };
  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render:(create_time)=>formateDate(create_time)
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render:(auth_time)=>formateDate(auth_time)
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };
  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };
  addRole = async () => {
    const result = await reqAddRole(this.input.props.value);
    if (result.status === 0) {
      message.success("添加角色成功");
      // this.getRoles()
      // 可以不请求直接添加到roles列表
      const role = result.data;
      // const roles =[...this.state.roles]
      // roles.push(role)
      // this.setState({roles:roles})
      this.setState((state) => ({
        roles: [...state.roles, role],
      }));
    } else {
      message.error("添加角色失败");
    }
    this.setState({ showStatus: 0 });
  };
  setRole = async() => {
    //   console.log('select',select)
     const menus =  this.auth.current.getMenus()
     const role = this.state.role
     role.menus=menus
     role.auth_time = Date.now()
     role.auth_name = this.props.user.username
    //  console.log(role)
     const result = await reqUpdateRole(role)
     if(result.status===0){
         message.success('设置权限成功')
         //如果更新的是自己角色权限,强制退出
        if(this.props.user.username!=='admin'&&role._id===this.props.user.role_id){
          message.info('权限已更改,请重新登录')
          this.props.logout()
          return 
          // this.props.history.replace('./login')
        }
     }else{
         message.error('设置权限失败')
     }
    this.setState({ showStatus: 0 });
  };
  componentDidMount() {
    this.getRoles();
  }
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  render() {
    const { roles, role, showStatus } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          创建角色
        </Button>
        <Button
          type="primary"
          onClick={() => this.setState({ showStatus: 2 })}
          disabled={!role._id}
        >
          设置角色权限
        </Button>
      </span>
    );

    // console.log(roles)
    // console.log(this.columns)
    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={roles}
          columns={this.columns}
          loading={this.state.loading}
          rowSelection={{ type: "radio", selectedRowKeys: [role._id],onSelect:(role)=>{
            this.setState({role:role})} 
          }} //设置单选
          onRow={(role) => {
            return {
              onSelect:(event) => {
                this.setState({ role });
              },
              onClick: (event) => {
                this.setState({ role });
              }, // 点击行
              onDoubleClick: (event) => {},
              onContextMenu: (event) => {},
              onMouseEnter: (event) => {}, // 鼠标移入行
              onMouseLeave: (event) => {},
            };
          }}
          bordered
        />
        <Modal
          title="添加角色"
          visible={showStatus === 1}
          onOk={this.addRole}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AddForm
            categoryName
            setInput={(input) => {
              this.input = input;
            }}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={showStatus === 2}
          onOk={this.setRole}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <SetTree role={role} ref={this.auth}/>
        </Modal>
      </Card>
    );
  }
}
export default connect(state=>({user:state.user}),{logout})(Role)