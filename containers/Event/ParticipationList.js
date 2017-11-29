import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { List, Image } from 'semantic-ui-react'

import AnswerButtons from 'containers/Event/AnswerButtons'

import withEvent from 'hocs/queries/withEvent'

export const fragment = gql`
  fragment EventParticipationFragment on Event {
    id
    participations {
      id
      answer
      user {
        id
        fullname
        avatar
      }
    }
  }
`

export const query = gql`
  query EventView(
    $eventId: ID!
  ) {
    event (id: $eventId ) {
      ...EventParticipationFragment
    }
  }
  ${fragment}
`

class EventView extends React.PureComponent {

  render() {
    const { event, communityId } = this.props;

    return (
      <List selection verticalAlign='middle'>
        {event && event.participations.map(participation => (
          <Link
            key={participation.id}
            href={`/community-registration?communityId=${communityId}&userId=${participation.user.id}`}
            as={`/communities/${communityId}/users/${participation.user.id}`}>
            <List.Item>
              <List.Content floated='right'>
                <AnswerButtons
                  userId={participation.user.id}
                  eventId={event.id}
                  event={event}
                  participation={participation}
                  compact
                />
              </List.Content>
              <List.Content>
                <List.Header>
                  {participation.user && participation.user.avatar && <Image avatar src={participation.user.avatar} />}
                  {participation.user && participation.user.fullname}
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>
        ))}
      </List>
    )
  }
}

export default withEvent(query)(EventView)
