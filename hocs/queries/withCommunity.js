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
    props: ({ data: { loading, ...props } }) => ({
      loading,
      ...props,
      // events: community && (community.events || (community.registration && community.registration.participations && community.registration.participations.map(participation => ({
      //   ...participation.event,
      //   participation
      // })))),
      // nevents: community && (community.nevents || (community.registration && community.registration.nparticipations)),
      // registrations: community && community.registrations,
    }),
  })
}
