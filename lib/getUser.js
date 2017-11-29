import gql from 'graphql-tag'

export default async (context, apolloClient) => {
  try {
    const data = await apolloClient.query({
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
      });
    return data && data.user;
  } catch(e) {
    console.log(e)
    return null;
  }
}
