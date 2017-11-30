import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'

import EventFilter from 'components/web/Event/Filter'
import EventList from 'components/web/Event/List'

import withCommunity from 'hocs/queries/withCommunity'

export const fragment = gql`
  fragment CommunityRegistrationParticipationFragment on Organisation {
    id
    registration (userId: $userId) {
      id
      nparticipations (
        after: $after
        before: $before
        answer: $answer
      )
      participations (
        after: $after
        before: $before
        answers: $answers
        answer: $answer
        limit: $limit
        offset: $offset
      ) {
        id
        answer
        event {
          id
          title
          startTime
          endTime
        }
      }
    }
  }
`

export const query = gql`
  query CommunityRegistrationParticipation(
    $communityId: ID!
    $userId: ID
    $after: DateTime
    $before: DateTime
    $answers: [EventAnswer!]
    $answer: EventAnswer
    $limit: Int
    $offset: Int
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityRegistrationParticipationFragment
    }
  }
  ${fragment}
`

class RegistrationCommunityParticipationList extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      participationFilter: {
        offset: 0,
        limit: 10,
        after: moment(),
        before: null,
      }
    }
  }

  filterChange = (filter) => this.setState({ participationFilter: filter })

  render() {
    const { communityId, userId } = this.props

    const EventListWithParticipation = withCommunity(query)(EventList)

    return (
      <div style={{ textAlign: 'center'}}>
        <EventFilter
          filter={this.state.participationFilter}
          onChange={this.filterChange}
        />
        <EventListWithParticipation
          offset={this.state.offset}
          communityId={communityId}
          userId={userId}
          answer="YES"
          {...this.state.participationFilter}
        />
      </div>

    )
  }
}

export default RegistrationCommunityParticipationList
