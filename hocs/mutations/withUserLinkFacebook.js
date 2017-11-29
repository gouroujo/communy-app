import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const mutation = gql`
  mutation linkFacebookToUser(
    $input: linkFacebookToUserInput!
    $id: ID!
  ) {
    linkFacebookToUser(
      id: $id
      input: $input
    ) {
      id
      fullname
      avatar
      hasCredentials
    }
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => ({
    linkFacebook: (data) => {
      return mutate({
        variables: {
          id: ownProps.userId,
          input: data,
        },
      })
    }
  }),
});
