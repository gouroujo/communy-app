import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'next/router';
import { Icon, Segment, Step } from 'semantic-ui-react'

import withCommunityCreate from 'hocs/mutations/withCommunityCreate';

import CompanyForm from 'containers/Company/Form';

class OrganisationCreateForm extends React.PureComponent {
  afterSubmit = (res) => {
    this.props.router.push(
      `/company?companyId=${res.data.company.id}`,
      `/companies/${res.data.company.id}`
    )
  }
  render() {
    const { createCommunity, router, ...props } = this.props
    return (
      <div>
        <Step.Group attached='top'>
          <Step active>
            <Icon name='info' />
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Décrivez votre entreprise</Step.Description>
            </Step.Content>
          </Step>

          <Step>
            <Icon name='heart' />
            <Step.Content>
              <Step.Title>Associations</Step.Title>
              <Step.Description>Choisissez vos associations</Step.Description>
            </Step.Content>
          </Step>

          <Step>
            <Icon name='users' />
            <Step.Content>
              <Step.Title>Collaborateurs</Step.Title>
              <Step.Description>Ajoutez vos collaborateurs</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Facturation</Step.Title>
              <Step.Description>Entrez votre moyen de paiement</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        <Segment attached>
          <CompanyForm
            submit={createCommunity}
            submitText="Créer mon entreprise"
            callback={this.afterSubmit}
            {...props}
           />
        </Segment>
      </div>
    )
  }
}

export default compose(
  withCommunityCreate,
  withRouter,
)(OrganisationCreateForm);
