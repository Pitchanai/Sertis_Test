import React, { Component, useState } from 'react'
import { Tabs, PageHeader, Menu, Select } from 'antd'
import 'antd/dist/antd.css'
import './CreateParty.css'

// import { url } from 'inspector'

import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { UserCardCategories } from '../../../types/UserCardCategories'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}

type InputCreatePartyProps = {
  reload: any
}

type CreatePartyProps = {
  reload: any
  categories: [UserCardCategories?]
}

class CreateParty extends Component<InputCreatePartyProps, CreatePartyProps> {
  constructor(props: InputCreatePartyProps) {
    super(props)
    this.state = { categories: [], reload: props.reload }
    // this.state = { isRegister: false }
    // this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.getAllCategories()
  }

  render() {
    return (
      <div>
        <Form {...layout} name="createPartyForm" onFinish={this.submitForm}>

          <h2 style={{ marginLeft: '25%', marginBottom: '10px' }}>Create card</h2>

          <Form.Item label="FullName" name="name" rules={[{ required: true, message: 'Please input your name.' }]}>
            <Input />
          </Form.Item>

          {/* <Dropdown overlay={this.me}>
          </Dropdown> */}

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category.' }]}>
            <Select>
              {this.state.categories.map((cat) => (
                <Option key={cat?._id} value={cat?._id!}>{cat?.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please input your status.' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Content" name="content" rules={[{ required: true, message: `Please input your card's content.` }]}>
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create card
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  // menu = (
  //   <Menu>
  //     {this.state.categories.map((cat) => (
  //       <Menu.Item key={cat?._id}> {cat?.name} </Menu.Item>
  //     ))}
  //   </Menu>
  // )

  async getAllCategories() {
    const fetchRequest = await fetch('/api/card/category', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    let response = await fetchRequest.json()
    console.log('response', response)
    if (response && response.success && response.body && response.body.length) {
      this.setState({ categories: response.body })
    }
  }

  async submitForm(value: any) {
    console.log('value', value)
    const fetchRequest = await fetch('/api/card/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(value),
    })

    let response = await fetchRequest.json()
    console.log('res', response)
    if (response.success) {
      // this.props.reload()
    }
  }
}

export default CreateParty
