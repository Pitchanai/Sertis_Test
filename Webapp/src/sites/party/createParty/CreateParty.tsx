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
      name: '',
      content: '',
      status: '',
      category: '',
    }
  }

  constructor(props: InputCreatePartyProps) {
    super(props)
    this.state = { categories: [], status: [], reload: props.reload }
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.getAllCategories()
    this.getAllStatus()
  }

  render() {
    return (
      <div>
        <Form {...layout} name="createPartyForm" onFinish={this.submitForm} initialValues={this.props.defaultValue}>
          {this.props.isEdit ? null : <h2 style={{ marginLeft: '25%', marginBottom: '10px' }}>Create card</h2>}

          <Form.Item label="FullName" name="name" rules={[{ required: true, message: 'Please input your name.' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category.' }]}>
            <Select>
              {this.state.categories.map((cat) => (
                <Option key={cat?._id} value={cat?._id!}>
                  {cat?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status.' }]}>
            <Select>
              {this.state.status.map((cat) => (
                <Option key={cat?._id} value={cat?._id!}>
                  {cat?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Content" name="content" rules={[{ required: true, message: `Please input your card's content.` }]}>
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '6px' }}>
              {this.props.isEdit ? 'Edit card' : 'Create card'}
            </Button>
            {this.props.isEdit ? (
              <Button type="primary" danger onClick={this.deleteCard}>
                Delete
              </Button>
            ) : null}
          </Form.Item>
        </Form>
      </div>
    )
  }

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
    if (response && response.success && response.body && response.body.length) {
      this.setState({ status: response.body })
    }
  }

  async submitForm(value: any) {
    if (this.props.isEdit) {
      value.id = this.props.defaultValue.id
    }

    const fetchRequest = await fetch(this.props.isEdit ? 'api/card/edit' : '/api/card/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(value),
    })

    let response = await fetchRequest.json()
    if (response.success) {
      this.props.reload()
    }
  }

  async deleteCard() {
    if (!this.props.isEdit) {
      return
    }

    const body = {id: this.props.defaultValue.id}

    const fetchRequest = await fetch('api/card/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    })

    let response = await fetchRequest.json()
    if (response.success) {
      this.props.reload()
    }
  }
}

export default CreateParty
