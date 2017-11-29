import React from 'react'
import gql from 'graphql-tag'

import ParticipationList from 'components/web/Event/List'

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
          parts {
            startTime
            endTime
          }
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
  render() {
    const { community } = this.props

    const registration = community && community.registration
    if (!registration || !registration.participations) return null

    return (
      <ParticipationList events={registration.participations.map(participation => ({
        ...participation.event,
        organisation: {
          title: community.title,
          id: community.id,
        },
        participation: {
          id: participation.id,
          answer: participation.answer
        }
      }))}
      compact
      emptyMsg="Aucune participation"
      displayOrg={false}
    />
    )
  }
}

export default withCommunity(query)(RegistrationCommunityParticipationList)
