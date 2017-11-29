import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { query as CommunityRegistrationListQuery } from 'containers/Community/RegistrationList'

const addUserToCommunity = graphql(gql`
  mutation addUserToCommunity (
    $communityId: ID!
    $userId: ID!
  ) {
    community: addUserToOrganisation (id: $communityId, userId: $userId) {
      id
      registration (userId: $userId)  {
        id
        ack
        confirm
        role
        user {
          id
          fullname
          avatar
        }
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    addOrganisation: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
          userId: ownProps.userId,
        },
      })
    }
  }),
});

const removeUserToCommunity = graphql(gql`
  mutation removeUserToCommunity (
    $communityId: ID!
    $userId: ID!
  ) {
    community: removeUserToOrganisation(id:$communityId, userId: $userId) {
      id
      nusers
      registration (userId: $userId) {
        id
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    removeUser: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
          userId: ownProps.userId,
        },
        update: (store, { data }) => {
          if (!data || !data.community ) return

          const community = store.readQuery({
            query: CommunityRegistrationListQuery,
            variables: { communityId: data.community.id },
          })
          if (!community.registrations) return
          const index = community.registrations.findIndex(e => e.id === data.community.registration);
          if (index >= 0) return

          community.registrations.splice(index, 1)
          store.writeQuery({
            query: CommunityRegistrationListQuery,
            variables: { communityId: data.community.id },
            data: community,
          })
        }
      })
    }
  }),
});

const confirmUserToCommunity = graphql(gql`
  mutation confirmUserToCommunity (
    $communityId: ID!
    $userId: ID!
  ) {
    community: confirmUserToOrganisation(id:$communityId, userId: $userId) {
      id
      nusers
      registration (userId: $userId)  {
        id
        ack
        confirm
        role
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    confirmUser: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
          userId: ownProps.userId,
        },
      })
    }
  }),
});

export default compose(
  addUserToCommunity,
  removeUserToCommunity,
  confirmUserToCommunity
)
