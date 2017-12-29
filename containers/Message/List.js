import React from 'react'
import gql from 'graphql-tag'
import { Item } from 'semantic-ui-react'

import withCurrentUser from 'hocs/queries/withCommunity'
import MessageFragment from 'fragments/Message'
import CommunityMinFragment from 'fragments/CommunityMin'

export const query = gql`
  query CommunityEventList(
    $limit: Int
    $offset: Int
  ) {
    user {
      id
      messages (
        limit: $limit
        offset: $offset
      ) {
        ...MessageFragment
        community: organisation {
          ...CommunityMinFragment
        }
      }
    }
  }
  ${MessageFragment}
  ${CommunityMinFragment}
`

class UserMessageList extends React.PureComponent {
  render() {
    const { user, onClick } = this.props;
    if (!user) return null

    if (!user.messages || user.messages.length === 0) {
      return (
        <div>
          Vide
        </div>
      )
    }
    return (
      <Item.Group divided>
        {user.messages.map(message => (
          <Item key={message.id} className="message-item" onClick={() => onClick(message.id)}>
            {/* <Item.Image size='tiny'>
              A b d sdz
            </Item.Image> */}

            <Item.Content>
              <Item.Header>{message.subject}</Item.Header>
              <Item.Meta>
                {message.community && message.community.title}
              </Item.Meta>
              <Item.Description>
                {message.body}
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
        <style jsx global>{`
          .message-item {
            padding: 0 !important;
            font-size: 0.8em !important;
            line-height: 0.8em !important;
            height: 7em;
            overflow: hidden;
            position:relative;
          }
          .message-item:after {
            height: 2em !important;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            visibility: visible!important;
            background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,1) 100%);
          }
          .message-item > .content {
            margin: 0 5px !important;
            padding-top: 1em !important;
          }
        `}</style>
      </Item.Group>
    )
  }
}

export default withCurrentUser(query)(UserMessageList)
