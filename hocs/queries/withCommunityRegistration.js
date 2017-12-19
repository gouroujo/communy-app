import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CommunityRegistrationFragment from 'fragments/CommunityRegistration'

export const query = gql`
  query getCommunityPermissions (
    $communityId: ID!
  ) {
    community: organisation (id: $communityId) {
      ...CommunityRegistrationFragment
    }
  }
  ${CommunityRegistrationFragment}
  `

export default graphql(query,
{
  options: (ownProps) => ({
    variables: {
      communityId: ownProps.communityId,
    },
  }),
  props: ({ data: { loading, community } }) => ({
    loading,
    registration: community && community.registration,
  })
})
