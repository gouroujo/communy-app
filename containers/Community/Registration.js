import React from 'react'
import gql from 'graphql-tag'

import RegistrationLayout from 'components/web/Registration/Layout'
import RegistrationUser from 'components/web/Registration/User'
import RegistrationRoleButton from 'components/web/Registration/RoleButton'

import ParticipationList from 'containers/Registration/CommunityParticipationList'
import RegistrationCommunityButtons from 'containers/Registration/CommunityButtons'

import withCommunity from 'hocs/queries/withCommunity'
import withRegistrationSetRole from 'hocs/mutations/withRegistrationSetRole'

import UserFragment from 'fragments/User'
import RegistrationFragment from 'fragments/Registration'

export const query = gql`
  query CommunityRegistration(
    $communityId: ID!
    $userId: ID
  ) {
    community: organisation (id: $communityId ) {
      id
      ownregistration: registration {
        ...RegistrationFragment
      }
      registration (userId: $userId) {
        ...RegistrationFragment
        user {
          ...UserFragment
        }
      }
    }
  }
  ${UserFragment}
  ${RegistrationFragment}
`

class RegistrationCommunity extends React.PureComponent {

  render() {
    const { community, communityId, userId } = this.props

    const registration = community && community.registration
    const ownregistration = community && community.ownregistration
    const SetRoleButtons = withRegistrationSetRole(RegistrationRoleButton)
    return (
      <RegistrationLayout aside={
        <div style={{ textAlign: 'center' }}>
          <RegistrationUser user={registration && registration.user} />
          <RegistrationCommunityButtons
            registration={registration}
            userId={registration && registration.user && registration.user.id}
            communityId={communityId}
          />
          <SetRoleButtons
            permissions={ownregistration && ownregistration.permissions}
            registration={registration}
            communityId={communityId}
            userId={userId}
          />
        </div>
      }>
        <ParticipationList
          communityId={communityId}
          userId={userId}
        />
      </RegistrationLayout>
    )
  }
}

export default withCommunity(query)(RegistrationCommunity)
