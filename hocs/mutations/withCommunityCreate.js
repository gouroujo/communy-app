import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { fragment as CommunityContainerFragment } from 'containers/Community/Container'
import { query as CommunityListQuery } from 'containers/Community/List'
import { query as UserQuery } from 'hocs/queries/withUser'

export const mutation = gql`
  mutation createCommunity(
    $input: OrganisationInput!
  ) {
    community: createOrganisation (input: $input) {
      ...CommunityContainerFragment
    }
  }
  ${CommunityContainerFragment}
`;

export default graphql(mutation, {
  props: ({ mutate }) => ({
    createCommunity: (data) => {
      return mutate({
        variables: {
          input: data,
        },
        update: (store, { data }) => {
          if (data && data.community) {

            if (data.community.registration) {
              const user = store.readQuery({
                query: UserQuery,
              });
              if (user && user.registrations) {
                user.registrations.push({
                  ...data.community.registration,
                  organisation: {
                    id: data.community.id,
                    title: data.community.title,
                    logo: data.community.logo,
                    cover: data.community.cover
                  }
                })
                store.writeQuery({
                  query: UserQuery,
                  data: user,
                })
              }
            }
            try {
              const communities = store.readQuery({
                query: CommunityListQuery
              })
              if (communities) {
                communities.push(data.community)
                store.writeQuery({
                  query: CommunityListQuery,
                  data: communities
                })
              }
            } catch (e) {
              console.log(e)
            }


          }
        }
      })
    }
  }),
});
