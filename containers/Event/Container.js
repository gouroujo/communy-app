import React from 'react'
import gql from 'graphql-tag'
import Head from 'next/head'

import EventHeader from 'components/web/Event/Header'

import AnswerButtons from 'containers/Event/AnswerButtons'
import AddUserButton from 'containers/Event/AddUserButton'
import ToggleParticipation from 'containers/Event/ToggleParticipation'

import withCommunityRegistration from 'hocs/queries/withCommunityRegistration'
import withEvent from 'hocs/queries/withEvent'

import EventFragment from 'fragments/Event'
import ParticipationFragment from 'fragments/Participation'

export const query = gql`
  query EventContainer(
    $eventId: ID!
    $userId: ID
  ) {
    event (id: $eventId ) {
      ...EventFragment
      participation (userId: $userId) {
        ...ParticipationFragment
      }
    }
  }
  ${EventFragment}
  ${ParticipationFragment}
`

class EventContainer extends React.PureComponent {

  render() {
    const { event, eventId, communityId, registration } = this.props;
    return (
      <div style={{ margin: '0 1em'}}>
        <Head>
          <title>{event ? `Communy - ${event.title}` : 'Communy - Chargement...'}</title>
        </Head>
        <EventHeader
          event={event}
          eventId={eventId}
          communityId={communityId}>

          {registration && registration.permissions.includes('event_answer') && (
            <div>
              <h5>Souhaitez-vous participez à cette activité ?</h5>
              <AnswerButtons event={event} eventId={eventId} participation={event && event.participation} />
            </div>
          )}

          <div style={{ margin: 5 }}>
            {registration && registration.permissions.includes('event_add_user') && (
              <AddUserButton eventId={eventId} communityId={communityId} />
            )}
          </div>

          <div style={{ margin: 5 }}>
            {registration && registration.permissions.includes('event_edit') && (
              <ToggleParticipation event={event} eventId={eventId} communityId={communityId} />
            )}
          </div>

        </EventHeader>
        {this.props.children}
      </div>
    )
  }
}

export default withEvent(query)(withCommunityRegistration(EventContainer))
