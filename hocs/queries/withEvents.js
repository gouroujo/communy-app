import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        limit: ownProps.limit,
        offset: ownProps.offset,
        before: ownProps.before,
        after: ownProps.after,
        answer: ownProps.answer,
        userId: ownProps.userId,
        organisationIds: ownProps.organisationIds,
      },
    }),
    props: ({ data: { loading, events } }) => ({
      loading,
      events,
    }),
    skip: (ownProps) => !!ownProps.events,
  })
}
