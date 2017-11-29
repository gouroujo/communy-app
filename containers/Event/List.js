import React from 'react'
import gql from 'graphql-tag';

import withEvents from 'hocs/queries/withEvents'

import EventListComponent from 'components/web/Event/List'

export const fragment = gql`
  fragment EventListFragment on Event {
    id
    title
    description
    duration
    parts {
      startTime
      endTime
    }
    nanswer
    nyes
    nno
    nmb
    participation {
      id
      answer
    }
    organisation {
      id
      title
    }
  }
`

export const query = gql`
  query EventList(
    $limit: Int
    $offset: Int
    $before: DateTime
    $after: DateTime
  ) {
    events (
      limit: $limit
      offset: $offset
      before: $before
      after: $after
    ) {
      ...EventListFragment
    }
  }
  ${fragment}
`

class EventList extends React.PureComponent {
  render() {
    const { events, ...props } = this.props;

    return <EventListComponent
      events={events}
      {...props}
    />
  }
}

export default withEvents(query)(EventList)
