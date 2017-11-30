import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        limit: ownProps.limit,
        offset: ownProps.offset,
        categories: ownProps.categories,
        search: ownProps.categories
      },
    }),
    props: ({ data: { loading, communities } }) => ({
      loading,
      communities,
    }),
    skip: (ownProps) => !!ownProps.communities,
  })
}
