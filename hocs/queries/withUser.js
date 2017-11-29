import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query UserMenu {
    user {
      id
      firstname
      lastname
      fullname
      norganisations
      email
      hasCredentials
      nunreadMessage
      avatar
      phone1
      birthday
      birthplace
      phone2
      registrations {
        id
        role
        ack
        confirm
        organisation {
          id
          title
          cover
          logo
        }
      }
    }
  }
  `
  
export default graphql(query,
{
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  })
})
