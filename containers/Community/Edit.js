import React from 'react'
import gql from 'graphql-tag'

import withCommunityEdit from 'hocs/mutations/withCommunityEdit'
import withCommunity from 'hocs/queries/withCommunity'
import CommunityForm from 'containers/Community/Form'

export const fragment = gql`
  fragment CommunityEditFragment on Organisation {
    id
    title
    description
    type
    categories
  }
`

export const query = gql`
  query CommunityView(
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityEditFragment
    }
  }
  ${fragment}
`

class OrganisationCreateForm extends React.PureComponent {

  render() {
    const { editCommunity, communityId, ...props } = this.props

    const CommunityFormWithData = withCommunity(query)(CommunityForm)
    return (
      <CommunityFormWithData
        communityId={communityId}
        submit={editCommunity}
        submitText="Sauvegarder"
        {...props}
       />
    )
  }
}

export default withCommunityEdit(OrganisationCreateForm)
