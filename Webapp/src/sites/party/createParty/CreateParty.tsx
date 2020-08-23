import React, { Component, useState } from 'react'
import { Tabs, PageHeader, Menu, Select } from 'antd'
import 'antd/dist/antd.css'
import './CreateParty.css'

// import { url } from 'inspector'

import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { UserCardCategories } from '../../../types/UserCardCategories'
import { UserCardStatus } from '../../../types/UserCardStatus'
import { DefaultValueCreatePartyProps } from '../../../types/DefaultValueCreatePartyProps'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}

type InputCreatePartyProps = {
  reload: any,
  isEdit: boolean,
  defaultValue: DefaultValueCreatePartyProps
}

type CreatePartyProps = {
  reload: any
  categories: [UserCardCategories?]
  status: [UserCardStatus?]
}

class CreateParty extends Component<InputCreatePartyProps, CreatePartyProps> {
  public static defaultProps = {
    reload: null,
    isEdit: false,
    defaultValue: {
      name: "",
      content: "",
      status: "",
      category: ""
    }
  }

  constructor(props: InputCreatePartyProps) {
    super(props)
    this.state = { categories: [], status: [], reload: props.reload }
    // this.state = { isRegister: false }
    // this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.getAllCategories()
    this.getAllStatus()
  }

  render() {
    return (
      <div>
        <Form {...layout} name="createPartyForm" onFinish={this.submitForm}>
          {this.props.isEdit ? null : <h2 style={{ marginLeft: '25%', marginBottom: '10px' }}>Create card</h2>}

          <Form.Item label="FullName" name="name" rules={[{ required: true, message: 'Please input your name.' }]}>
            <Input defaultValue={this.props.isEdit ? this.props.defaultValue.name : ''} />
          </Form.Item>

          {/* <Dropdown overlay={this.me}>
          </Dropdown> */}

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category.' }]}>
            <Select defaultValue={this.props.isEdit ? this.props.defaultValue.category : ''}>
              {this.state.categories.map((cat) => (
                <Option key={cat?._id} value={cat?._id!}>
                  {cat?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status.' }]}>
            <Select defaultValue={this.props.isEdit ? this.props.defaultValue.status : ''}>
              {this.state.status.map((cat) => (
                <Option key={cat?._id} value={cat?._id!}>
                  {cat?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Content" name="content" rules={[{ required: true, message: `Please input your card's content.` }]}>
            <Input defaultValue={this.props.isEdit ? this.props.defaultValue.content : ''} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {this.props.isEdit ? 'Edit card' : 'Create card'}
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

  async getAllStatus() {
    const fetchRequest = await fetch('/api/card/status', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    let response = await fetchRequest.json()
    console.log('response', response)
    if (response && response.success && response.body && response.body.length) {
      this.setState({ status: response.body })
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
