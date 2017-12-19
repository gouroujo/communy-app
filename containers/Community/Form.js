import React from 'react';

import { Form, Message } from 'semantic-ui-react'
import SelectType from 'components/web/Community/SelectType'
import SelectTag from 'components/web/Community/SelectTag'

class OrganisationForm extends React.PureComponent {
  state = {
    loading: this.props.loading || false,
    organisation: this.props.community ||{},
    error: null,
    success: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.community) {
      this.setState(prevState => ({
        ...prevState,
        loading: nextProps.loading,
        organisation: {
          ...nextProps.community,
          ...prevState.community
        },
      }))
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const error = [];
    if (!this.state.organisation.title) error.push('title');
    if (error.length > 0) return this.setState({ error });

    this.setState({ loading: true, error: null, success: false });
    this.props.submit({
      title: this.state.organisation.title,
      description: this.state.organisation.description,
      type: this.state.organisation.type,
      categories: this.state.organisation.categories,
    })
    .then(res => {
      console.log(res)
      return new Promise(resolve => {
        this.setState({ loading: false, success: true }, () => resolve(res))
      })
    });
  }

  handleChange = (ev, { name, value, checked }) => {
    return this.setState(prevState => ({
      ...prevState,
      organisation: {
        ...prevState.organisation,
        [name]: value || checked,
      }
    }))
  }
  handleChangeTag = (tags) => {
    this.setState(prevState => ({
      organisation: {
        ...prevState.organisation,
        categories: tags
      }
    }))
  }

  render() {
    const {
      loading,
      organisation,
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
          label='Titre'
          value={organisation.title || ''}
          placeholder="Entrez le nom de votre communauté"
          onChange={this.handleChange}
          autoFocus
          required
          error={error && error.includes('title')}
        />
        <Form.TextArea
          autoHeight
          name="description"
          label='À propos'
          value={organisation.description || ''}
          placeholder="Expliquez en quelques phrases ce que fait votre communauté, quels types d'activité vous organisez, si vous recherchez quelque chose, ect..."
          onChange={this.handleChange}
        />
        <Form.Field>
          <SelectType onChange={this.handleChange} value={organisation.type || 'private'}/>
        </Form.Field>
        <Form.Field>
          <label>Domaines d'activité</label>
          <div style={{ textAlign: 'center'}}>
            <SelectTag
              tags={organisation.categories || []}
              onChange={this.handleChangeTag} />
          </div>

        </Form.Field>
        <Message
          success
          header="Mise à jour effectuée"
          content={`La communauté ${organisation.title} a bien été mise à jour`}
        />
        <Form.Button positive>{submitText}</Form.Button>
      </Form>
    )
  }
}

export default OrganisationForm;
