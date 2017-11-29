import React from 'react';

import { Form, Message, Button, Icon } from 'semantic-ui-react'
import SelectType from 'components/web/Community/SelectType';
// import ButtonUploadImage from 'components/ButtonUploadImage';

const ORG_CATEGORIES = [
  { id: 'ngo', icon: 'heart', label: 'Caritatif' },
  { id: 'art', icon: 'paint brush', label: 'Art' },
  { id: 'music', icon: 'music', label: 'Musique' },
  { id: 'science', icon: 'lab', label: 'Science' },
  { id: 'it', icon: 'at', label: 'Informatique' },
  { id: 'politic', icon: 'university', label: 'Politique' },
  { id: 'consumer', icon: 'shopping basket', label: 'Consommation' },
  { id: 'ecology', icon: 'leaf', label: 'Écologie' },
  { id: 'sport', icon: 'soccer', label: 'Sport' },
  { id: 'handi', icon: 'wheelchair', label: 'Handicap' },
  { id: 'student', icon: 'student', label: 'Éducation' },
  { id: 'party', icon: 'birthday', label: 'Fête' },
  { id: 'migration', icon: 'exchange', label: 'Migrations' },
]
class OrganisationForm extends React.PureComponent {
  state = {
    loading: this.props.loading || false,
    organisation: this.props.organisation ||{},
    error: null,
    success: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organisation) {
      this.setState(prevState => ({
        ...prevState,
        loading: nextProps.loading,
        organisation: {
          ...nextProps.organisation,
          ...prevState.organisation
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
    }).then(res => {
      this.setState({ loading: false, success: true }, this.props.callback ? () => this.props.callback(res) : null);
      return res;
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
  handleSelectTag = (ev, { name }) => {
    ev.preventDefault();
    this.setState(prevState => {
      if (!prevState.organisation) return;
      const categories = prevState.organisation.categories ? [...prevState.organisation.categories] : []
      if (categories.includes(name)) {
        categories.splice(categories.findIndex(e => e === name), 1);
      } else {
        categories.push(name)
      }
      return {
        ...prevState,
        organisation: {
          ...prevState.organisation,
          categories
        }
      }
    })
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
            {ORG_CATEGORIES.map(({id, icon, label}) => (
              <Button
                type="button"
                key={id}
                name={id}
                onClick={this.handleSelectTag}
                style={{ margin: 5 }}
                animated='fade'
                primary={organisation.categories && organisation.categories.includes(id)}
                size='massive'>
                <Button.Content hidden>
                  <span style={{ fontSize: '1rem'}}>{label}</span>
                </Button.Content>
                <Button.Content visible>
                  <Icon name={icon} />
                </Button.Content>
              </Button>
            ))}
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
