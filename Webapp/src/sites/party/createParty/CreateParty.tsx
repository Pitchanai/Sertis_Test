import React, { Component } from 'react'
import { Tabs, PageHeader } from 'antd'
import 'antd/dist/antd.css'
import './CreateParty.css'

// import { url } from 'inspector'

import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}

type CreatePartyProps = {
  reload: any
}

class CreateParty extends Component<CreatePartyProps> {
  constructor(props: any) {
    super(props)
    // this.state = { isRegister: false }
    this.submitForm = this.submitForm.bind(this)
  }

  render() {
    return (
      <div>
        <Form {...layout} name="createPartyForm" onFinish={this.submitForm}>
          <h2 style={{ marginLeft: '25%', marginBottom: '10px' }}>
            Create Party
          </h2>
          <Form.Item
            label="ชื่อปาร์ตี้"
            name="name"
            rules={[{ required: true, message: 'กรุณาใส่ชื่อปาร์ตี้' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="รายละเอียดเพิ่มเติม"
            name="description"
            rules={[
              { required: false, message: 'รายละเอียดเพิ่มเติมของปาร์ตี้' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="จำนวนคนที่ขาด"
            name="maxMember"
            rules={[{ required: true, message: 'กรุณาใส่จำนวนคนที่ขาด' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              สร้างปาร์ตี้
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  async submitForm(value: any) {
    const fetchRequest = await fetch('/api/party/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: value.name,
        description: value.description,
        maxMember: value.maxMember,
      }),
    })

    let response = await fetchRequest.json()
    console.log('res', response)
    if (response.success) {
      this.props.reload()
    }
  }
}

export default CreateParty
