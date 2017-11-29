import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'next/router';

import withCommunityCreate from 'hocs/mutations/withCommunityCreate';

import CommunityForm from 'containers/Community/Form';

class OrganisationCreateForm extends React.PureComponent {
  afterSubmit = (res) => {
    this.props.router.push(
      `/community?communityId=${res.data.community.id}`,
      `/communities/${res.data.community.id}`
    )
  }
  render() {
    const { createCommunity, router, ...props } = this.props
    return (
      <CommunityForm
        submit={createCommunity}
        submitText="Créer ma communauté"
        callback={this.afterSubmit}
        {...props}
       />
    )
  }
}

export default compose(
  withCommunityCreate,
  withRouter,
)(OrganisationCreateForm);
