import React from 'react'
import gql from 'graphql-tag'

import EventDescription from 'components/web/Event/Description'

import withEvent from 'hocs/queries/withEvent'


export const query = gql`
  query EventDescription(
    $eventId: ID!
  ) {
    event (id: $eventId ) {
      id
      description
    }
  }
`

class EventView extends React.PureComponent {

  render() {
    const { event } = this.props;
    return (
      <div style={{
        maxWidth: 600,
        margin: '1em auto'
      }}>
        <EventDescription event={event} />
      </div>
    )
  }
}

export default withEvent(query)(EventView)
