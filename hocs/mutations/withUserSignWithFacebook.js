import {
  withApollo,
  compose,
  graphql
} from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'

import redirect from 'lib/redirect'

import CurrentUserFragment from 'fragments/CurrentUser'

export const mutation = gql`
  mutation signWithFacebook(
    $input: linkFacebookToUserInput!
  ) {
    user: signWithFacebook (input: $input) {
      ...CurrentUserFragment
      token
    }
  }
  ${CurrentUserFragment}
`;

const hoc = graphql(mutation, {
  props: ({ ownProps, mutate }) => ({
    signWithFacebook: (data) => {
      return mutate({
        variables: {
          input: data,
        },
        update: (store, { data: { user } }) => {
          if (user && user.token) {
            document.cookie = cookie.serialize('token', user.token, {
              secure: process.env.NODE_ENV === 'production',
              maxAge: 30 * 24 * 60 * 60, // 30 days
              path: '/'
            })
            ownProps.client.resetStore().then(() => {
              if (!ownProps.callback) {
                redirect({}, ownProps.target || '/', ownProps.as || '/')
              } else {
                ownProps.callback()
              }
            })
          }
        }
      })
    }
  }),
});

export default compose(withApollo, hoc)
