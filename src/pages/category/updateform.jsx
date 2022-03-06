import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        category:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    render() {
        const {category} = this.props
        return (
            <Form >
                <Item   name="username"   initialValue={category?category:''} rules={[{ required: true, message: "名称必须输入!" }]}>
                <Input     placeholder='请输入分类名称'  ref={input =>this.props.setForm(input)}></Input>
                </Item>
            </Form>
        )
    }
}
