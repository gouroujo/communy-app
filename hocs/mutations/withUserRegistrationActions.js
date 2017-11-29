import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { query as CommunityQuery } from 'containers/Community/Container'
import { query as UserQuery } from 'hocs/queries/withUser'

const addCommunityToUser = graphql(gql`
  mutation addUserToCommunity (
    $communityId: ID!
  ) {
    user: addOrganisationToUser(organisationId: $communityId) {
      id
      registration (organisationId: $communityId) {
        id
        ack
        confirm
        role
        organisation {
          id
          title
          logo
        }
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    addCommunity: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
        },
        update: (store, { data }) => {
          if (!data.user || !data.user.registration) return
          // ----- ADD TO COMMUNITY REGISTRATION ---
          const community = store.readQuery({
            query: CommunityQuery,
            variables: { communityId: ownProps.communityId },
          });
          if (community) {
            community.registration = {
              id: data.user.registration.id,
              ack: data.user.registration.ack,
              confirm: data.user.registration.confirm,
              role: data.user.registration.role
            }
            store.writeQuery({
              query: CommunityQuery,
              variables: { communityId: ownProps.communityId },
              data: community,
            })
          }
          // ----- ADD TO USER REGISTRATION ---
          const user = store.readQuery({
            query: UserQuery,
          });
          if (user && user.registrations) {
            user.registrations.push(data.user.registration)
            store.writeQuery({
              query: UserQuery,
              data: user,
            })
          }
        }
      })
    }
  }),
});

const removeCommunityToUser = graphql(gql`
  mutation removeCommunityToUser (
    $communityId: ID!
  ) {
    user: removeOrganisationToUser(organisationId: $communityId) {
      id
      norganisations
      registration (organisationId: $communityId) {
        id
        ack
        confirm
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    removeCommunity: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
        },
        update: (store, { data }) => {
          if (!data.user || !data.user.registration) return

          const user = store.readQuery({
            query: UserQuery,
          });
          if (user && user.registrations) {
            const index = user.registrations.findIndex(e => e.id === data.user.registration.id)
            if (index >= 0) return
            user.registrations.splice(index, 1)
            store.writeQuery({
              query: UserQuery,
              data: user,
            })
          }
        }
      })
    }
  }),
});

const ackCommunityToUser = graphql(gql`
  mutation ackCommunityToUser (
    $communityId: ID!
  ) {
    user: ackOrganisationToUser(organisationId: $communityId) {
      id
      norganisations
      registration (organisationId: $communityId) {
        id
        ack
        confirm
        role
      }
    }
  }
  `, {
  props: ({ mutate, ownProps }) => ({
    ackCommunity: (ev) => {
      if (ev) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      return mutate({
        variables: {
          communityId: ownProps.communityId,
        },
      })
    }
  }),
});

export default compose(
  addCommunityToUser,
  removeCommunityToUser,
  ackCommunityToUser
)
