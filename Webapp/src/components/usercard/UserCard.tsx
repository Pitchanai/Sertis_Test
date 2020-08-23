import React, { Component } from 'react'
import { Tabs, PageHeader, Card } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import './UserCard.css'

// import { url } from 'inspector'

import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'

import { UserCardValueProps } from '../../types/UserCardProps'
import { CardValueProps } from '../../types/CardValueProps'
import { debug } from 'console'
import Modal from 'antd/lib/modal/Modal'
import CreateParty from '../../sites/party/createParty/CreateParty'
import { DefaultValueCreatePartyProps } from '../../types/DefaultValueCreatePartyProps'

type UserCardProps = {
  reload: any,
  card: CardValueProps
}

type UserCardState = {
  showEditModal: boolean
}

// type PartyCardProps = {
  // value: PartyCardValueProps
  // reload: any
// }

class UserCard extends Component<UserCardProps, UserCardState> {
  constructor(props: UserCardProps) {
    super(props)
    this.state = { showEditModal: false }
  }

  defaultValue: DefaultValueCreatePartyProps = {
    name: this.props.card.name,
    content: this.props.card.content,
    status: this.props.card.status._id,
    category: this.props.card.category._id
  }

  render() {
    return (
      <Card hoverable style={{ width: 300 }}>
        <div>
          <div className="top-card">
            <b className="card-cat-info">{this.props.card.category.name.toUpperCase()}</b>
            <div className="status-container">
              {this.props.card.isOwner ? (
                <Button type="link" onClick={this.showEditModal}>
                  edit
                </Button>
              ) : null}
              <div className="status-ring" style={{ backgroundColor: this.props.card.status.color }}>
                <div className="status-ring-inside"></div>
              </div>
            </div>
          </div>
        </div>
        <p className="content-text">{this.props.card.content}</p>
        <div className="card-info-container">
          <div className="profile-empty"></div>
          <div className="card-info">
            <div>
              <b>{this.props.card.name}</b>
            </div>
            <div>{this.createdAt.fromNow()}</div>
          </div>
        </div>
        <Modal
          title="Edit Card"
          visible={this.state.showEditModal}
          onCancel={this.handleCancelModal}
          footer={[
            <Button key="back" onClick={this.handleCancelModal}>
              Cancel
            </Button>,
          ]}
        >
          <CreateParty reload={() => {}} isEdit={true} defaultValue={this.defaultValue}></CreateParty>
        </Modal>
      </Card>
    )
  }

  createdAt = moment(this.props.card.createdAt)

  showEditModal = () => {
    this.setState({
      showEditModal: true,
    })
  }

  handleCancelModal = () => {
    this.setState({ showEditModal: false })
  }
}

export default UserCard
