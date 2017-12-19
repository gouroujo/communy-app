import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'

import withCommunity from 'hocs/queries/withCommunity'
import withMobileDetection from 'hocs/withMobileDetection'

import Cover from 'containers/Community/Cover';
import Logo from 'containers/Community/Logo';
import CommunityType from 'components/web/Community/Type'

import UserRegistrationButtons from 'containers/Registration/UserButtons'

export const fragment = gql`
  fragment CommunityHeaderFragment on Organisation {
    id
    title
    logo
    cover
    type
    registration {
      id
      ack
      role
      confirm
      permissions
    }
  }
`

export const query = gql`
  query CommunityHeader(
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityHeaderFragment
    }
  }
  ${fragment}
`

class CommunityHeader extends React.PureComponent {
  render() {
    const {
      community,
      communityId,
      isMobile,
    } = this.props

    return (
      <div>
        <Cover
          canUplodad={community && community.registration && community.registration.permissions && community.registration.permissions.includes('edit')}
          src={community && community.cover}
          communityId={communityId} />
        <Logo
          canUplodad={community && community.registration && community.registration.permissions && community.registration.permissions.includes('edit')}
          src={community && community.logo}
          communityId={communityId}
          className="logo"
        />
        <div style={{
          margin: isMobile ? '0.2rem 5px' : '-70px 0 30px 0',
          paddingLeft: isMobile ? 0 : 215,
          textAlign: isMobile ? 'center' : 'initial'
        }}>
          <Link
            href={`/community?communityId=${communityId}`}
            as={`/communities/${communityId}`}
            >
            <h1>{community && community.title}</h1>
          </Link>

          <CommunityType type={community && community.type} />
          <br/>
          {isMobile && <UserRegistrationButtons communityId={communityId} community={community} registration={community.registration} />}
        </div>
        {!isMobile && (
          <div style={{
            position: 'absolute',
            right: 10,
            top: 310
          }}>
            {community && (
              <UserRegistrationButtons communityId={communityId} community={community} registration={community.registration} />
            )}
          </div>
        )}
      </div>
    )

  }
}

export default withCommunity(query)(withMobileDetection(CommunityHeader));
