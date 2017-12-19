import React from 'react'
import gql from 'graphql-tag';
import Link from 'next/link'
import { Button } from 'semantic-ui-react'

import RegistrationList from 'containers/Registration/UserList'

import withCommunity from 'hocs/queries/withCommunity'
import RegistrationFragment from 'fragments/Registration'
import UserMinFragment from 'fragments/UserMin'

export const query = gql`
  query CommunityEventList (
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      id
      registrations {
        ...RegistrationFragment
        user {
          ...UserMinFragment
        }
      }
    }
  }
  ${RegistrationFragment}
  ${UserMinFragment}
`

class CommunityRegistrationList extends React.PureComponent {

  render() {
    const { community, communityId } = this.props

    if (!community) return null

    return (
      <div style={{ textAlign: 'center', margin: '0 2em' }}>
        {community.registrations && community.registrations.length > 0 && (
          <Link
            href={`/community-registration-add?communityId=${communityId}`}
            as={`/communities/${communityId}/users/invite`}>
            <Button primary content="Inviter des membres" />
          </Link>
        )}
        <RegistrationList
          style={{ textAlign: 'initial' }}
          communityId={communityId}
          registrations={community.registrations}
        />
      </div>
    )
  }
}

export default withCommunity(query)(CommunityRegistrationList)
