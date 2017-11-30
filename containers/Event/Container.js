import React from 'react'
import gql from 'graphql-tag'
import Head from 'next/head'

import EventHeader from 'components/web/Event/Header'

import AnswerButtons from 'containers/Event/AnswerButtons'
import AddUserButton from 'containers/Event/AddUserButton'

import withEvent from 'hocs/queries/withEvent'

export const fragment = gql`
  fragment EventContainerFragment on Event {
    id
    title
    description
    nanswer
    nyes
    nno
    nmb
    participation {
      id
      answer
    }
    startTime
    endTime
    duration
  }
`

export const query = gql`
  query EventContainer(
    $eventId: ID!
  ) {
    event (id: $eventId ) {
      ...EventContainerFragment
    }
  }
  ${fragment}
`

class EventContainer extends React.PureComponent {

  render() {
    const { event, eventId, communityId } = this.props;
    return (
      <div style={{ margin: '0 1em'}}>
        <Head>
          <title>{event ? `Communy - ${event.title}` : 'Communy - Chargement...'}</title>
        </Head>
        <EventHeader
          event={event}
          eventId={eventId}
          communityId={communityId}>
          <div>
            <h5>Souhaitez-vous participez à cette activité ?</h5>
            <AnswerButtons event={event} eventId={eventId} participation={event && event.participation} />
          </div>
          <div style={{ margin: 5 }}>
            <AddUserButton eventId={eventId} communityId={communityId} />
          </div>
        </EventHeader>
        {this.props.children}
      </div>
    )
  }
}

export default withEvent(query)(EventContainer)
