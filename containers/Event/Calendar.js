import React from 'react'
import gql from 'graphql-tag'

import withEvents from 'hocs/queries/withEvents'

import Calendar from 'components/web/Event/Calendar'
import moment from 'moment'

export const fragment = gql`
  fragment EventCalendarFragment on Event {
    id
    title
    description
    duration
    startTime
    endTime
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
      ...EventCalendarFragment
    }
  }
  ${fragment}
`

class EventCalendar extends React.PureComponent {
  state = {
    date: moment(this.props.date),
    type: 'months',
  }

  handleNext = () => {
    return this.setState(prevState => ({ date: moment(prevState.date).add(1, prevState.type)}))
  }
  handlePrevious = () => {
    return this.setState(prevState => ({ date: moment(prevState.date).subtract(1, prevState.type)}))
  }
  handleToday = () => {
    return this.setState({ date: moment() })
  }

  render () {
    const CalendarWithEvents = withEvents(query)(Calendar);
    return (
      <CalendarWithEvents
        after={moment(this.state.date).startOf(this.state.type).toDate()}
        before={moment(this.state.date).endOf(this.state.type).toDate()}
        date={this.state.date}
        handleNext={this.handleNext}
        handlePrevious={this.handlePrevious}
        handleToday={this.handleToday}
      />
    )
  }
}

export default EventCalendar;
