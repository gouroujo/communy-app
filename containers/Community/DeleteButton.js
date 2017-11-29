import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';

import { Button, Icon } from 'semantic-ui-react'
import ButtonWithConfirm from 'components/ButtonWithConfirm';

import withOrganisation from 'hocs/queries/withOrganisation';
import withOrganisationDelete from 'hocs/mutations/withOrganisationDelete';

class ManageButtons extends React.PureComponent {

  handelDelete = () => {
    return this.props.deleteOrganisation()
    .then(() => this.props.history.push('/'));
  }
  render() {

    const {
      loading,
      organisation,
    } = this.props;

    if (loading) return (
      <Button negative loading>
        <Icon name='trash' />
        Chargement...
      </Button>
    )

    return (
      <ButtonWithConfirm
        negative
        modalIcon="trash"
        onConfirm={this.handelDelete}
        modalTitle={`Supprimer ${organisation.title}`}
        modalContent={`Souhaitez-vous supprimer la communauté ${organisation.title} ?
          Cela supprimera tous les comptes de membres et tous les évènements.
          Cette action est DEFINITIVE et IRREVERSIBLE.`}
      >
        <Icon name='trash' />
        Supprimer {organisation.title}
      </ButtonWithConfirm>
    )
  }
}

export default compose(
  withOrganisation,
  withOrganisationDelete,
  withRouter,
)(ManageButtons);
