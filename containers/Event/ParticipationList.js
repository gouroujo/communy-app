import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { List, Image } from 'semantic-ui-react'

import Answer from 'components/web/Event/Answer'
import AnswerButtons from 'containers/Event/AnswerButtons'

import withCommunityRegistration from 'hocs/queries/withCommunityRegistration'
import withEvent from 'hocs/queries/withEvent'
import UserMinFragment from 'fragments/UserMin'
import ParticipationFragment from 'fragments/Participation'

export const query = gql`
  query EventParticipations(
    $eventId: ID!
  ) {
    event (id: $eventId ) {
      id
      participations {
        ...ParticipationFragment
        user {
          ...UserMinFragment
        }
      }
    }
  }
  ${ParticipationFragment}
  ${UserMinFragment}
`

class EventView extends React.PureComponent {
  componentDidMount() {
    this.props.data.startPolling(2000);
  }

  render() {
    const { event, registration, communityId } = this.props;

    return (
      <List selection verticalAlign='middle'>
        {event && event.participations.map(participation => (
          <Link
            key={participation.id}
            href={`/community-registration?communityId=${communityId}&userId=${participation.user.id}`}
            as={`/communities/${communityId}/users/${participation.user.id}`}>
            <List.Item>
              <List.Content floated='right'>
                {registration && registration.permissions.includes('event_add_user') ? (
                  <AnswerButtons
                    userId={participation.user.id}
                    eventId={event.id}
                    event={event}
                    participation={participation}
                    compact
                  />
                ) : (
                  <Answer answer={participation && participation.answer}/>
                )}

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

export default withEvent(query)(withCommunityRegistration(EventView))
