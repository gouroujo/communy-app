import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        messageId: ownProps.messageId,
      },
    }),
    props: ({ data: { loading, ...props } }) => ({
      loading,
      ...props,
    }),
    skip: (ownProps) => !ownProps.messageId
  })
}
