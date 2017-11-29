import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        eventId: ownProps.eventId,
        communityId: ownProps.communityId,
        userId: ownProps.userId,
      },
    }),
    props: ({ data: { loading, event } }) => ({
      loading,
      event,
    }),
  })
}
