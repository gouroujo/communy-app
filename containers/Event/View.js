import React from 'react'
import gql from 'graphql-tag'

import EventDescription from 'components/web/Event/Description'

import withEvent from 'hocs/queries/withEvent'

export const fragment = gql`
  fragment EventViewFragment on Event {
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
    parts {
      startTime
      endTime
      duration
    }
  }
`

export const query = gql`
  query EventView(
    $eventId: ID!
  ) {
    event (id: $eventId ) {
      ...EventViewFragment
    }
  }
  ${fragment}
`

class EventView extends React.PureComponent {

  render() {
    const { event } = this.props;
    return (
      <div>
        <EventDescription event={event} />
      </div>
    )
  }
}

export default withEvent(query)(EventView)
