import React, { Component, useImperativeHandle } from 'react'
import './Home.css'

import background from '../../assets/images/party-background.jpg'
// import { url } from 'inspector'

import { Form, Input, Button, Checkbox, Modal } from 'antd'
import 'antd/dist/antd.css'
import { Redirect } from 'react-router-dom'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}

const registerCheckLayout = {
  wrapperCol: { offset: 2, span: 22 },
}

interface HomeState {
  isRegister: boolean,
  isAuthenticated: boolean,
  policyCheck1: boolean,
  policyCheck2: boolean
}

class Home extends Component<{}, HomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isRegister: false,
      isAuthenticated: false,
      policyCheck1: false,
      policyCheck2: false,
    }
  }

  render() {
    return this.state.isAuthenticated ? (
      <Redirect to="/party" />
    ) : (
      <div className="Home">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="home-background home-section"
        >
          <div className="title-container">
            <div className="home-name">Sertis</div>
          </div>
        </div>
        <div className="home-section">
          <div className="login-container">
            <Form
              {...layout}
              onFinish={this.submitForm}
              name="loginform"
              initialValues={{ remember: true }}
            >
              <div className="form-title">
                {this.state.isRegister ? 'Register' : 'Log in'}
              </div>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username' },
                ]}
              >
                <Input />
              </Form.Item>

              {this.state.isRegister ? null : (
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )}

              {/* {this.state.isRegister ? null : (
                <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              )}

              {this.state.isRegister ? (
                <Form.Item
                  {...registerCheckLayout}
                  name="policy"
                  valuePropName="checked"
                >
                  <Checkbox onChange={this.onCheckboxAccept1Change}>
                    ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน Sertis
                    รวมถึงนโยบายความเป็นส่วนตัว
                  </Checkbox>
                </Form.Item>
              ) : null} */}

              {/* {this.state.isRegister ? (
                <Form.Item
                  {...registerCheckLayout}
                  name="newsletter"
                  valuePropName="checked"
                >
                  <Checkbox onChange={this.onCheckboxAccept2Change}>
                    ฉันต้องการรับข่าวสารเกี่ยวกับโปรโมชั่นจาก PartyHaan
                  </Checkbox>
                </Form.Item>
              ) : null} */}

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  {this.state.isRegister ? 'Register' : 'Log in'}
                </Button>
                <div style={{ marginLeft: '10px', display: 'inline' }}>
                  {this.state.isRegister ? 'Already have an account?' : 'Or'}{' '}
                  <Button
                    onClick={this.toggleIsRegister}
                    type="link"
                    style={{ padding: '0' }}
                  >
                    {this.state.isRegister ? 'back to log in' : 'register now'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  // enable = login = true
  // enable = !login && this.policyChecked1 && this.policyCheched2

  toggleIsRegister = () => {
    this.setState({ isRegister: !this.state.isRegister })
  }

  onCheckboxAccept1Change = (event: any) => {
    this.setState({ policyCheck1: event.target.checked })
  }

  onCheckboxAccept2Change = (event: any) => {
    this.setState({ policyCheck2: event.target.checked })
  }

  submitForm = async (value: any) => {
    const body: any = {username: value.username}
    if (!this.state.isRegister) {
      body['password'] = value.password
    }
    const fetchUrl = this.state.isRegister
      ? '/api/auth/signup'
      : '/api/auth/signin'
    const fetchRequest = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    })

    let response = await fetchRequest.json()
    if (response.success) {
      if (this.state.isRegister) {
        this.registerSuccess(response.body.password, this)
      } else {
        this.isAuthenticated()
      }
    } else {
      this.registerFailed(response.message)
    }
  }

  registerSuccess = (password: string, refer: any) => {
    Modal.info({
      title: 'Please remember your password.',
      content: (
        <div>
          <p>Your password is <b>{password}</b></p>
        </div>
      ),
      onOk() {
        refer.isAuthenticated()
      }
    })
  }

  registerFailed = (message: string) => {
    Modal.error({
      title: message
    })
  }

  isAuthenticated = () => {
    this.setState({isAuthenticated: true})
  }
}


export default Home
