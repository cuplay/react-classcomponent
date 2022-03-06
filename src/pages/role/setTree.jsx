import React, { Component } from "react";
import { Tree, Input, Form } from "antd";
import menuConfig from "../../config/menuConfig";
import PropTypes from "prop-types";

export default class SetTree extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { menus } = this.props.role;
    // console.log(menus)
    this.state = {
      checkedKeys: menus,
    };
    // this.setRole=setRole
    // this.setState({
    //     checkedKeys:menus,
    // })
  }
  // getTreeNodes=()=>{
  //     return menuList.reduce((pre,item)=>{
  //         pre
  //         return pre
  //     },[])
  // }
  // UNSAFE_componentWillMount(){
  //     console.log(this.props.role.menus)
  //     this.setState({cheackedKeys:this.props.role.menus})
  // }
  /* 为父组件提交获取最新menus数据的方法 */
  getMenus = () => this.state.checkedKeys;

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    const treeData = menuConfig;
  
    const onCheck = (checkedKeys) => {
      // console.log("onCheck", checkedKeys);
      this.setState({ checkedKeys: checkedKeys });
    };
    const formItemLayout = {
      labelCol: { span: 4 }, //左侧label宽度
      wrapperCol: { span: 10 }, //右侧包裹输入框宽度
    };
    // console.log(this.props);
    // console.log(checkedKeys)
    return (
      <Form {...formItemLayout}>
        <Form.Item label="角色名称">
          <Input value={role.name} disabled />
        </Form.Item>
        <Form.Item>
          <Tree
            checkable
            //   defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultExpandAll={true}
            //   defaultSelectedKeys={['0-0-0', '0-0-1']}
            checkedKeys={checkedKeys}
            // onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    );
  }
}
