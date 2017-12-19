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
    props: ({ data: { loading, registration } }) => ({
      loading,
      registration,
      events: registration && registration.participations && registration.participations.map(participation => ({
        ...participation.event,
        participation
      })),
      nevents: registration && registration.nparticipations,
    }),
  })
}
