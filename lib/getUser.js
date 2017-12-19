import gql from 'graphql-tag'
import CurrentUserFragment from 'fragments/CurrentUser'

export default (context, apolloClient) => (
  apolloClient.query({
    query: gql`
    query getUser {
      user {
        ...CurrentUserFragment
      }
    }
    ${CurrentUserFragment}
    `
  })
  .then(({ data }) => {
    if (window && window.FS && data && data.user) {
      window.FS.identify(data.user.id, {
        displayName: data.user.fullname,
        email: data.user.email,
        norganisations: data.user.norganisations,
      });
    }

    return { user: data && data.user }
  })
  .catch(() => {
    // Fail gracefully
    return { user: null }
  })
)
