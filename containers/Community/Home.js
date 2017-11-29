import gql from 'graphql-tag';
import withCommunity from 'hocs/queries/withCommunity';

import CommunityDescription from 'components/web/Community/Description';

export const fragment = gql`
  fragment CommunityViewFragment on Organisation {
    id
    title
    logo
    cover
    nusers
    nevents
    description
  }
`

export const query = gql`
  query CommunityDescription(
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityViewFragment
    }
  }
  ${fragment}
`
const CommunityHome = ({ community }) => (
  <div style={{ margin: '0 1em'}}>
    <CommunityDescription community={community} />
  </div>
)
export default withCommunity(query)(CommunityHome)
