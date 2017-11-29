import React from 'react'
import gql from 'graphql-tag';
import Link from 'next/link'
import { Button } from 'semantic-ui-react'

import withCommunity from 'hocs/queries/withCommunity'

import EventList, { fragment as EventListFragment } from 'containers/Event/List'

export const fragment = gql`
  fragment CommunityEventListFragment on Organisation {
    id
    title
    events {
      ...EventListFragment
    }
  }
  ${EventListFragment}
`

export const query = gql`
  query CommunityEventList (
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityEventListFragment
    }
  }
  ${fragment}
`

class CommunityEventList extends React.PureComponent {

  render() {
    const { community, communityId } = this.props

    if (!community) return null

    return (
      <div style={{ textAlign: 'center', margin: '0 2em' }}>
        {community.events && community.events.length > 0 && (
          <Link
            href={`/community-event-create?communityId=${communityId}`}
            as={`/communities/${communityId}/events/create`}>
            <Button primary content="Créer une activité" />
          </Link>
        )}
        <EventList
          style={{ textAlign: 'initial' }}
          events={community.events ||[]}
          emptyComponent={
            <Link
              href={`/community-event-create?communityId=${communityId}`}
              as={`/communities/${communityId}/events/create`}>
              <Button primary content="Créer une activité" />
            </Link>
          }
          emptyMsg="Aucune activité organisée par cette communauté"
        />
      </div>
    )
  }
}

export default withCommunity(query)(CommunityEventList)
