import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import LinkButton from "../../component/link-button";
import { RollbackOutlined } from "@ant-design/icons";
import { reqCategorys,reqAddProduct } from "../../api";
import PicturesWall from "./pictures-wall";
import PropTypes from "prop-types";
import RichTextEditor from "./rich-text-editor";

const Item = Form.Item;
const TextArea = Input.TextArea;
export default class AddUpdate extends Component {
  static propTypes = {
    imgs: PropTypes.array,
  };
  state = {
    options: [],
    setOptions: () => {},
    cName1: "",
    cName2: "",
  };

  constructor(props) {
    super(props);
    //创造保存ref标识的标签对象的容器
    this.pw = React.createRef();
    this.editor = React.createRef();
  }
  componentDidMount() {
    this.getCategorys("0");
  }
  /* async返回值是新的promise对象,promise结果和值由async的结果 */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    // debugger
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.initOptions(categorys);
      } else {
        return categorys; //返回
      }
      // console.log(categorys)
    }
  };

  initOptions = async (categorys) => {
    const options = categorys.map((c) => ({
      //注意小括号
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    //如果是一个二级分类列表
    const { isUpdate, product } = this;
    const { pCategoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      //获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId);
      //生成二级下拉列表的options
      const childOptions = subCategorys.map((c) => ({
        //注意小括号,生成二级列表
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      //关联到对应的一级option
      //找到对应的一级对象
      //   debugger
      const targetOption = options.find(
        (option) => option.value === pCategoryId
      );
      if (targetOption) {
        //如果找到
        targetOption.children = childOptions;
      }
    }
    this.setState({ options });
  };
  //如何判断是修改还是更新
  UNSAFE_componentWillMount() {
    let product
    try{
       product=this.props.location.state.desc
      }catch{
        product={}
      }
      this.product=product
      this.isUpdate=!!product

  }
  onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
  };
  /* 用来加载下面数字组 */
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    //显示loading
    targetOption.loading = true;
    //   load options lazily
    //获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    if (subCategorys && subCategorys.length > 0) {
      const cOptions = subCategorys.map((c) => ({
        //注意小括号,生成二级列表
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      targetOption.children = cOptions;
    } else {
      //当前分类没有二级分类
      targetOption.isLeaf = true;
    }
    targetOption.loading = false;
    this.setState({ options: [...this.state.options] });
  };
  onFinish = async (values) => {//调用接口请求函数去添加/更新
    const imgs = this.pw.current.getImgs();
    const detail = this.editor.current.getDetail();
    const {name,desc,price,categoryIds} =values
    const pCategoryId =categoryIds[0]
    const categoryId =categoryIds[1]
    const product = {name,desc,price,imgs,detail,pCategoryId,categoryId}
    if(this.isUpdate){
        product._id = this.product._id
    }
    const result = await reqAddProduct(product)
    if(result.status===0){
        message.success(`${this.isUpdate?'更新':'添加'}商品成功`)
        this.props.history.goBack()
    }else{
      message.error(`${this.isUpdate?'更新':'添加'}商品失败`)
    }
  };
  render() {
    const { isUpdate } = this;
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <RollbackOutlined />
        </LinkButton>
        {isUpdate ? "修改商品" : "添加商品"}
      </span>
    );
    const formItemLayout = {
      labelCol: { span: 3 }, //左侧label宽度
      wrapperCol: { span: 8 }, //右侧包裹输入框宽度
    };
    
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // function onChange(value) {
    //   console.log(value);
    // }
    const {
      name,
      desc,
      price,
      detail,
      imgs,
      pCategoryId,
      categoryId,
    } = this.product;
    const categoryIds = [];
    if (isUpdate) {
      //   console.log("pCategoryId", pCategoryId);
      if (pCategoryId !== "0") {
        categoryIds.push(pCategoryId);
      }
    }
    categoryIds.push(categoryId);

    return (
      <Card title={title} {...formItemLayout}>
        <Form
          onFinish={this.onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Item
            name="name"
            label="商品名称"
            initialValue={name}
            rules={[{ required: true, message: "必须输入商品名称!" }]}
          >
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item name="desc" label="商品描述" initialValue={desc}>
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            ></TextArea>
          </Item>
          <Item
            name="price"
            label="商品价格"
            initialValue={price}
            rules={[
              { required: true, message: "必须输入商品价格!" },
              {
                validator: (_, value) =>
                  !value || value * 1 > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("商品价格必须大于0")),
              },
            ]}
          >
            <Input
              type="number"
              placeholder="请输入商品价格"
              addonAfter="元"
            ></Input>
          </Item>
          <Item
            name="categoryIds"
            label="商品类别"
            rules={[{ required: true, message: "必须选择商品类别!" }]}
            initialValue={categoryIds}
          >
            <Cascader
              placeholder="请选择"
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
              changeOnSelect
            ></Cascader>
          </Item>
          <Item
            name="imgs"
            label="商品图片"
            initialValue={name}
          >
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          {/* 输入的是数值,指定type */}
          <Item
            name="detail"
            label="商品详情"
            labelCol={{ span: 3 }}
            wrapperCol= {{ span: 20 }}
          >
            <RichTextEditor ref={this.editor } detail={detail}/>
          </Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

/* 子组件调用父组件的方法:将父组件的方法以函数属性的形式传递给子组件,子组件就可以调用
父组件调用子组件的方法 :在父组件忠通过ref得到子组件标签对象(组件对象),调用其方法*/
