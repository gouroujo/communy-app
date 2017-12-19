import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CurrentUserFragment from 'fragments/CurrentUser'

export const query = gql`
  query UserMenu {
    user {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}

  `

export default graphql(query,
{
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  })
})
