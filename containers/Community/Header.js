import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'

import withCommunity from 'hocs/queries/withCommunity'
import withMobileDetection from 'hocs/withMobileDetection'


import { Button } from 'semantic-ui-react';

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
          src={community && community.cover}
          communityId={communityId}>
          {(community && community.registration && community.registration.role === 'ADMIN') && (
              <Link
                href={`/community-edit?communityId=${communityId}`}
                as={`/communities/${communityId}/edit`}>
                <Button key={1} icon='edit' size="mini" label={isMobile ? null : "Modifier"}/>
              </Link>
          )}
          {/* <Link href={`/communitys/${communityId}/settings`}>
            <Button key={2} icon='settings' size="mini" label={isMobile ? null : "Configurer"}/>
          </Link> */}
        </Cover>
        <Logo
          src={community && community.logo}
          communityId={communityId}
          style={{
            margin: isMobile ? '-60px auto 0 auto' : '-60px 10px 0 50px'
          }}
        />
        <div style={{
          margin: isMobile ? '0.2rem 5px' : '-70px 0 30px 0',
          paddingLeft: isMobile ? 0 : 215,
          textAlign: isMobile ? 'center' : 'initial'
        }}>
          <h1>{community && community.title}</h1>
          <CommunityType type={community && community.type} />
        </div>
        <div style={{
          position: 'absolute',
          right: 10,
          top: 310
        }}>
          {community && (
            <UserRegistrationButtons communityId={community.id} community={community} registration={community.registration} />
          )}
        </div>
      </div>
    )

  }
}

export default withCommunity(query)(withMobileDetection(CommunityHeader));
