import { graphql } from 'react-apollo';

export default (query) => {
  return graphql(query,
  {
    options: (ownProps) => ({
      variables: {
        communityId: ownProps.communityId,
        userId: ownProps.userId,
        answers: ownProps.answers,
        before: ownProps.before,
        after: ownProps.after,
        answer: ownProps.answer
      },
    }),
    props: ({ data: { loading, community } }) => ({
      loading,
      community,
    }),
  })
}
