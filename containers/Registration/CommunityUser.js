import React from 'react'
import gql from 'graphql-tag'

import RegistrationUser from 'components/web/Registration/User'
import RegistrationCommunityButtons from 'containers/Registration/CommunityButtons'

import withCommunity from 'hocs/queries/withCommunity'

export const fragment = gql`
  fragment CommunityRegistrationUserFragment on Organisation {
    id
    registration (userId: $userId) {
      id
      ack
      confirm
      role
      user {
        id
        fullname
        email
        phone1
        phone2
      }
    }
  }
`

export const query = gql`
  query CommunityRegistrationUser(
    $communityId: ID!
    $userId: ID
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityRegistrationUserFragment
    }
  }
  ${fragment}
`

class RegistrationCommunityUser extends React.PureComponent {
  render() {
    const { community } = this.props

    const registration = community && community.registration
    return (
      <div style={{ margin: '0 1em'}}>
        <RegistrationUser user={registration && registration.user} />
        <RegistrationCommunityButtons
          registration={registration}
          userId={registration && registration.user && registration.user.id}
          communityId={registration && registration.organisation && registration.organisation.id}
        />
      </div>
    )
  }
}

export default withCommunity(query)(RegistrationCommunityUser)
