import React from 'react'
import gql from 'graphql-tag'

import MessageFragment from 'fragments/Message'
import CommunityMinFragment from 'fragments/CommunityMin'
import withMessage from 'hocs/queries/withMessage'

export const query = gql`
  query MessageView (
    $messageId: ID!
  ) {
    message (id: $messageId ) {
      ...MessageFragment
      community: organisation {
        ...CommunityMinFragment
      }
    }
  }
  ${MessageFragment}
  ${CommunityMinFragment}
`
class MessageView extends React.PureComponent {

  render() {
    const { message } = this.props

    if (!message) {
      return (
        <div>
          Séléctionnez un message
        </div>
      )
    }
    return (
      <div>
        <h2>{message.subject}</h2>
        <p>{message.body}</p>
      </div>
    )
  }
}

export default withMessage(query)(MessageView)
