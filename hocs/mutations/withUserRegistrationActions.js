import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import dataIdFromObject from 'lib/dataIdFromObject'

import RegistrationFragment from 'fragments/Registration'
import CommunityRegistrationFragment from 'fragments/CommunityRegistration'
import UserRegistrationsFragment from 'fragments/UserRegistrations'


const addCommunityToUser = graphql(gql`
  mutation addUserToCommunity (
    $communityId: ID!
  ) {
    user: addOrganisationToUser(organisationId: $communityId) {
      id
      registration (organisationId: $communityId) {
        ...RegistrationFragment
        organisation {
          id
          title
          logo
        }
      }
    }
  }
  ${RegistrationFragment}
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
          const community = store.readFragment({
            id: dataIdFromObject({ id: ownProps.communityId, __typename: 'Organisation' }),
            fragmentName: 'CommunityRegistrationFragment',
            fragment: CommunityRegistrationFragment
          });

          if (community) {
            community.registration = data.user.registration
            store.writeFragment({
              id: dataIdFromObject({ id: ownProps.communityId, __typename: 'Organisation' }),
              fragment: CommunityRegistrationFragment,
              fragmentName: 'CommunityRegistrationFragment',
              data: community,
            })
          }

          // ----- ADD TO USER REGISTRATION ---
          const user = store.readFragment({
            id: dataIdFromObject({ id: data.user.id, __typename: 'User' }),
            fragmentName: 'UserRegistrationsFragment',
            fragment: UserRegistrationsFragment
          });

          if (user && user.registrations) {
            user.registrations.push(data.user.registration)
            store.writeFragment({
              id: dataIdFromObject({ id: data.user.id, __typename: 'User' }),
              fragmentName: 'UserRegistrationsFragment',
              fragment: UserRegistrationsFragment,
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

          const user = store.readFragment({
            id: dataIdFromObject({ id: data.user.id, __typename: 'User' }),
            fragmentName: 'UserRegistrationsFragment',
            fragment: UserRegistrationsFragment
          });

          if (user && user.registrations) {
            const index = user.registrations.findIndex(e => e.id === data.user.registration.id)
            if (index >= 0) return
            user.registrations.splice(index, 1)
            store.writeFragment({
              id: dataIdFromObject({ id: data.user.id, __typename: 'User' }),
              fragmentName: 'UserRegistrationsFragment',
              fragment: UserRegistrationsFragment,
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
