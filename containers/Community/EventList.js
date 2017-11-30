import React from 'react'
import gql from 'graphql-tag';
import moment from 'moment'

import Link from 'next/link'
import { Button } from 'semantic-ui-react'

import withCommunity from 'hocs/queries/withCommunity'

import { fragment as EventCalendarFragment } from 'containers/Event/Calendar'
import Calendar from 'components/web/Event/Calendar'

export const fragment = gql`
  fragment CommunityEventListFragment on Organisation {
    id
    title
    events (
      after: $after
      before: $before
    ) {
      ...EventCalendarFragment
    }
  }
  ${EventCalendarFragment}
`

export const query = gql`
  query CommunityEventList (
    $communityId: ID!
    $after: DateTime
    $before: DateTime
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityEventListFragment
    }
  }
  ${fragment}
`

class CommunityEventList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: moment(this.props.date),
      type: 'months',
    }
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
  render() {
    const { communityId } = this.props

    const CalendarWithEvents = withCommunity(query)(Calendar)
    return (
      <div>
        <CalendarWithEvents
          communityId={communityId}
          after={moment(this.state.date).startOf(this.state.type).toDate()}
          before={moment(this.state.date).endOf(this.state.type).toDate()}
          date={this.state.date}
          handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
          handleToday={this.handleToday}
        >
          <Link
            href={`/community-event-create?communityId=${communityId}`}
            as={`/communities/${communityId}/events/create`}>
            <Button primary content='Ajouter une activité' icon='add' labelPosition='left' />
          </Link>
        </CalendarWithEvents>
      </div>

    )
  }
}

export default CommunityEventList
