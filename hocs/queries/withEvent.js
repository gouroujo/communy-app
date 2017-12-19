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
    props: ({ data }) => ({
      data,
      loading: data.loading,
      event: data.event,
    }),
  })
}
