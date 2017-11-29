import React from 'react'
import gql from 'graphql-tag';
import Link from 'next/link'
import { Button } from 'semantic-ui-react'

import withCommunity from 'hocs/queries/withCommunity'

import RegistrationList, { fragment as RegistrationUserListFragment } from 'containers/Registration/UserList'

export const fragment = gql`
  fragment CommunityRegistrationListFragment on Organisation {
    id
    title
    registrations {
      ...RegistrationUserListFragment
    }
  }
  ${RegistrationUserListFragment}
`

export const query = gql`
  query CommunityEventList (
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityRegistrationListFragment
    }
  }
  ${fragment}
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
