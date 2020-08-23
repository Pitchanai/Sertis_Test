import React, { Component } from 'react'
import { Tabs, PageHeader } from 'antd'
import 'antd/dist/antd.css'
import './Party.css'

// import { url } from 'inspector'

import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'

import PartyCard from '../../components/partycard/PartyCard'
import CreateParty from './createParty/CreateParty'

import { PartyCardValueProps } from '../../types/PartyCardProps'
import { join } from 'path'
import { Redirect } from 'react-router-dom'

const { TabPane } = Tabs
interface PartyState {
  allParty: Array<PartyCardValueProps>,
  joinedParty: Array<PartyCardValueProps>,
  isHaveToLogin: boolean,
  tabActiveKey: string
}

class Party extends Component<{}, PartyState> {
  constructor(props: any) {
    super(props)
    this.state = { allParty: [], joinedParty: [], isHaveToLogin: false, tabActiveKey: '1' }

    this.onSignout = this.onSignout.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.reloadWithChange = this.reloadWithChange.bind(this)
  }

  componentDidMount() {
    this.getAllParty()
  }

  async getAllParty() {
    const fetchRequest = await fetch('/api/party/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    let response = await fetchRequest.json()
    if (!response.success && response.code == 'L001') {
      this.setState({isHaveToLogin: true})
    }
    let joinedParty = []
    if (response.body) {
      joinedParty = response.body.filter((party: any) => party.isJoined)
    }
    this.setState({ allParty: response.body, joinedParty: joinedParty })
    if (response.body.length == 0) {
      this.setState({ tabActiveKey: '3' })
    }
  }

  render() {
    return this.state.isHaveToLogin ? (<Redirect to="/"/>) : (
      <div>
        <PageHeader
          className="Party"
          onBack={this.onSignout}
          title="PartyHaan"
          subTitle="Welcome, user"
          extra={[
            <Button key="1" type="primary" onClick={this.onSignout}>
              Sign out
            </Button>,
          ]}
        />
        <div className="party-container">
          <Tabs defaultActiveKey="1" activeKey={this.state.tabActiveKey} onChange={this.onTabChange}>
            <TabPane tab="ปาร์ตี้ทั้งหมด" key="1">
              <div className="party-card-container">
                {(this.state.allParty || []).map((value, index) => {
                  return <PartyCard value={value} reload={() => {this.reload()}}></PartyCard>
                })}
              </div>
            </TabPane>
            <TabPane tab="ปาร์ตี้ที่เข้าร่วม" key="2">
              <div className="party-card-container">
                {(this.state.joinedParty || []).map((value, index) => {
                  return <PartyCard value={value} reload={() => {this.reload()}}></PartyCard>
                })}
              </div>
            </TabPane>
            <TabPane tab="สร้างปาร์ตี้" key="3">
              <CreateParty reload={() => {this.reloadWithChange()}} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }

  onSignout() {
    console.log(
      'connect.sid' +
        '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;Domain=' +
        window.location.hostname
    )
    document.cookie = 'connect.sid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;Domain=' + window.location.hostname
    this.setState({ isHaveToLogin: true })
  }

  onTabChange(activeKey: any) {
    this.setState({tabActiveKey: activeKey})
  }

  reload() {
    this.getAllParty()
  }

  reloadWithChange() {
    this.getAllParty()
    this.setState({tabActiveKey: '1'})
  }

}


export default Party