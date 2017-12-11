import gql from 'graphql-tag'

export default (context, apolloClient) => (
  apolloClient.query({
    query: gql`
    query getUser {
      user {
        id
        fullname
        avatar
        nunreadMessage
        registrations {
          id
          ack
          confirm
          role
          organisation {
            id
            logo
            cover
            title
          }
        }
      }
    }
    `
  }).then(({ data }) => {
    return { user: data && data.user }
  }).catch(() => {
    // Fail gracefully
    return { user: {} }
  })
)
