import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserFragment from 'fragments/User';

export const mutation = gql`
  mutation editUser(
    $input: UserInput!
  ) {
    editUser(
      input: $input
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export default graphql(mutation, {
  props: ({ mutate }) => ({
    editUser: (user) => {
      return mutate({
        variables: {
          input: user,
        },
      })
    }
  }),
});
