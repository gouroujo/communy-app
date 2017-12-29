import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { Accordion, Icon } from 'semantic-ui-react'

import MailingFragment from 'fragments/Mailing'
import MessageFragment from 'fragments/Message'
import UserMinFragment from 'fragments/UserMin'
import withMailing from 'hocs/queries/withMailing'

export const query = gql`
  query MailingView (
    $mailingId: ID!
  ) {
    mailing (id: $mailingId ) {
      ...MailingFragment
      messages {
        ...MessageFragment
        user {
          ...UserMinFragment
        }
      }
    }
  }
  ${MailingFragment}
  ${MessageFragment}
  ${UserMinFragment}
`
class MailingView extends React.PureComponent {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { mailing } = this.props
    const { activeIndex } = this.state

    if (!mailing) {
      return (
        <div>
          Séléctionnez un message
        </div>
      )
    }
    return (
      <div>
        <h2>{mailing.subject}</h2>
        <p>{mailing.body}</p>
        <Accordion fluid styled>
          {mailing.messages.map((message, i) => (
            <div key={message.id}>
              <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                <Icon name='dropdown' />
                {message.user && (
                  <span>
                    {message.user.fullname} ({message.user.email})
                  </span>
                )}
                <span style={{ float: 'right', fontWeight: '300'}}>{message.readAt ? `lu le ${moment(message.readAt).format('L')}` : 'non lu'}</span>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <p>{message.body}</p>
              </Accordion.Content>
            </div>
          ))}
      </Accordion>
      </div>
    )
  }
}

export default withMailing(query)(MailingView)
