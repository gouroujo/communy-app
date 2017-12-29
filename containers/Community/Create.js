import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'next/router'

import withCurrentUser from 'hocs/queries/withCurrentUser'
import withLoginBefore from 'hocs/withLoginBefore'
import withCommunityCreate from 'hocs/mutations/withCommunityCreate'

import CommunityForm from 'containers/Community/Form'

class OrganisationCreateForm extends React.PureComponent {

  handleSubmit = (input) => this.props.createCommunity(input)
    .then(res => this.props.router.push(
      `/community?communityId=${res.data.community.id}`,
      `/communities/${res.data.community.id}`
    ))

  render() {
    const { createCommunity, loginBefore, router, ...props } = this.props
    return (
      <CommunityForm
        submit={loginBefore(this.handleSubmit)}
        submitText="Créer ma communauté"
        {...props}
       />
    )
  }
}

export default compose(
  withCurrentUser,
  withLoginBefore,
  withCommunityCreate,
  withRouter,
)(OrganisationCreateForm);
