import React, { Component } from 'react'
import { Tabs, PageHeader, Card } from 'antd'
import 'antd/dist/antd.css'
import './UserCard.css'

// import { url } from 'inspector'

import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'

import { UserCardValueProps } from '../../types/UserCardProps'
import { CardValueProps } from '../../types/CardValueProps'

type UserCardProps = {
  reload: any,
  card: CardValueProps
}

// type PartyCardProps = {
  // value: PartyCardValueProps
  // reload: any
// }

class UserCard extends Component<UserCardProps> {
  constructor(props: UserCardProps) {
    super(props)
    // this.state = {reload: props.reload, card: props.card}
    // this.state = { isRegister: false }
  }

  render() {
    return (
      <Card hoverable style={{ width: 300 }}>
        <div>
          <div className="top-card">
            <b>{this.props.card.category.name.toUpperCase()}</b>
            <div className="status-ring" style={{backgroundColor: this.props.card.status.color}}></div>
          </div>
        </div>
        <p className="content-text">{this.props.card.content}</p>
        <h4>{this.props.card.name}</h4>
      </Card>
    )
  }

  // partyAction = async (event: any) => {
  //   if (this.props.value.isOwner) {
  //     return
  //   }

  //   const fetchUrl = this.props.value.isJoined ? '/api/party/leave' : 'api/party/join'
  //   console.log(this.props.value)
  //   const fetchRequest = await fetch(fetchUrl, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({ id: this.props.value.id }),
  //   })

  //   let response = await fetchRequest.json()
  //   if (response.success) {
  //     this.props.reload()
  //   }
  // }
}

export default UserCard
