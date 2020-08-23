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
      <Card
        hoverable
        style={{ width: 300}}
        >
          <h4>{this.props.card.name}</h4>
          <p>{this.props.card.content}</p>
        </Card>
      // // <div>
      // //   {this.props.value.name}
      // // </div>
      // <Card
      //   hoverable
      //   style={{ width: 300 }}
      //   cover={<img alt={this.props.value.name} src="sample-images/events.jpg" className="image-cover" />}
      //   className="party-card"
      // >
      //   <h4>{this.props.value.name}</h4>
      //   <p>{this.props.value.description}</p>
      //   <div className="card-action-container">
      //     <div>
      //       {this.props.value.joinedMember}/{this.props.value.maxMember}
      //     </div>
      //     <div>
      //       <Button
      //         danger={this.props.value.isJoined}
      //         disabled={this.props.value.isOwner || this.props.value.joinedMember == this.props.value.maxMember}
      //         onClick={this.partyAction}
      //         type="primary"
      //       >
      //         {this.props.value.isJoined ? 'ออกจากปาร์ตี้' : this.props.value.isOwner ? 'เจ้าของปาร์ตี้' : 'เข้าร่วม'}
      //       </Button>
      //     </div>
      //   </div>
      // </Card>
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
