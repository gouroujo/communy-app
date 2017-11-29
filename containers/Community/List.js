import gql from 'graphql-tag';
import withCommunities from 'hocs/queries/withCommunities';

import CommunityList from 'components/web/Community/List';
import CommunityListItem from 'components/web/Community/ListItem';

export const fragment = gql`
  fragment CommunityListFragment on Organisation {
    id
    title
    logo
    cover
    nusers
    nevents
    registration {
      id
      ack
      confirm
    }
  }
`

export const query = gql`
  query CommunityList(
    $limit: Int
  ) {
    communities: organisations (limit: $limit) {
      ...CommunityListFragment
    }
  }
  ${fragment}
`

export default withCommunities(query)(({ communities = [] }) => (
  <CommunityList>
    {communities.map(community => (
      <CommunityListItem key={community.id} community={community} />
    ))}
  </CommunityList>
))
