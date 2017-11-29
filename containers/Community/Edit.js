import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';

import withOrganisationEdit from 'hocs/mutations/withOrganisationEdit';
import withOrganisation from 'hocs/queries/withOrganisation';

import OrganisationForm from 'containers/Organisation/Form';

class OrganisationCreateForm extends React.Component {
  render() {
    const {
      editOrganisation,
      history,
      ...props
    } = this.props;
    return <OrganisationForm
      submit={editOrganisation}
      submitText="Sauvegarder"
      {...props}
     />
  }
}

export default compose(
  withOrganisation,
  withOrganisationEdit,
  withRouter,
)(OrganisationCreateForm);
