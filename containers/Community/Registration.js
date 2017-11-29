import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'

import RegistrationLayout from 'components/web/Registration/Layout'
import RegistrationUser from 'components/web/Registration/User'

import ParticipationFilter from 'components/web/Event/Filter'
import ParticipationList from 'containers/Registration/CommunityParticipationList'

import RegistrationCommunityButtons from 'containers/Registration/CommunityButtons'

import withCommunity from 'hocs/queries/withCommunity'


export const fragment = gql`
  fragment CommunityRegistrationFragment on Organisation {
    id
    registration (userId: $userId) {
      id
      ack
      confirm
      role
      user {
        id
        fullname
        avatar
        email
        phone1
        phone2
      }
    }
  }
`

export const query = gql`
  query CommunityRegistration(
    $communityId: ID!
    $userId: ID
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityRegistrationFragment
    }
  }
  ${fragment}
`

class RegistrationCommunity extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      participationFilter: {
        after: moment(),
        before: null,
        answers: ['YES']
      }
    }
  }

  filterChange = (filter) => this.setState({ participationFilter: filter })

  render() {
    const { community, communityId, userId } = this.props

    const registration = community && community.registration

    return (
      <RegistrationLayout aside={
        <div>
          <RegistrationUser user={registration && registration.user} />
          <RegistrationCommunityButtons
            registration={registration}
            userId={registration && registration.user && registration.user.id}
            communityId={communityId}
          />
        </div>
      }>
        <ParticipationFilter
          filter={this.state.participationFilter}
          onChange={this.filterChange}
        />
        <ParticipationList
          communityId={communityId}
          userId={userId}
          {...this.state.participationFilter}
        />
      </RegistrationLayout>
    )
  }
}

export default withCommunity(query)(RegistrationCommunity)
