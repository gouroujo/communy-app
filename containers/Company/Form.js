import React from 'react';

import { Form, Message } from 'semantic-ui-react'
import AddressInput from 'components/web/Address/Input'

class CompanyForm extends React.PureComponent {
  state = {
    loading: this.props.loading || false,
    company: this.props.company ||{},
    error: null,
    success: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this.setState(prevState => ({
        ...prevState,
        loading: nextProps.loading,
        company: {
          ...nextProps.company,
          ...prevState.company
        },
      }))
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const error = [];
    if (!this.state.company.title) error.push('title');
    if (error.length > 0) return this.setState({ error });

    this.setState({ loading: true, error: null, success: false });
    this.props.submit({
      title: this.state.company.title,
      description: this.state.company.description,
      address: this.state.company.address ? ({
        road: this.state.company.address.road,
        postcode: this.state.company.address.postcode,
        city: this.state.company.address.city,
        country_code: this.state.company.address.country_code
      }) : null,
    }).then(res => {
      this.setState({ loading: false, success: true }, this.props.callback ? () => this.props.callback(res) : null);
      return res;
    });
  }

  handleChange = (ev, { name, value}) => {
    return this.setState(prevState => ({
      ...prevState,
      company: {
        ...prevState.company,
        [name]: value,
      }
    }))
  }

  render() {
    const {
      loading,
      company,
      success,
      error
    } = this.state;
    const {
      submitText = 'Envoyer',
    } = this.props;
    return (
      <Form error={error} success={success} loading={loading} onSubmit={this.handleSubmit}>
        <Form.Input
          name="title"
          label='Dénomination'
          value={company.title || ''}
          placeholder="Entrez le nom de votre entreprise"
          onChange={this.handleChange}
          autoFocus
          required
          error={error && error.includes('title')}
        />
        <Form.TextArea
          autoHeight
          name="description"
          label='À propos'
          value={company.description || ''}
          placeholder="Décrivez en quelques phrases votre entreprise"
          onChange={this.handleChange}
        />
        <AddressInput name='address' value={company.address || {}} onChange={this.handleChange}/>
        <Message
          success
          header="Mise à jour effectuée"
          content={`Votre entreprise ${company.title} a bien été mise à jour`}
        />
        <Form.Button positive>{submitText}</Form.Button>
      </Form>
    )
  }
}

export default CompanyForm;
