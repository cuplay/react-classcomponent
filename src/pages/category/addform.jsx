import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
    static propTypes = {
        categorys:PropTypes.array.isRequired,
        setClasses:PropTypes.func.isRequired,
        setInput:PropTypes.func.isRequired
    }
    render() {
        const {categorys}= this.props
        return (
            <Form onValuesChange={this.onFinish}>
                <Item  initialValue='0'
                 name='classer'>
                <Select  ref={input =>this.props.setClasses(input)}>
                    <Option key='0'>一级分类</Option>
                   {categorys.map(c=><Option value={c._id} key={c._id}>{c.name}</Option>)}
                </Select>
                </Item>
                <Item  
                 name="username"   rules={[{ required: true, message: "名称必须输入!" }]}>
                <Input placeholder='请输入分类名称'  ref={input =>this.props.setInput(input)}></Input>
                </Item>
                {/* <Item></Item><Input></Input>
                <Input></Input> */}
            </Form>
        )
    }
}
