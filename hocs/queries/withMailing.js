import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        mailingId: ownProps.mailingId,
      },
    }),
    props: ({ data: { loading, ...props } }) => ({
      loading,
      ...props,
    }),
    skip: (ownProps) => !ownProps.mailingId
  })
}
