import React from 'react';
import { Form, Message } from 'semantic-ui-react'

import withCurrentUser from 'hocs/queries/withCurrentUser'
import withUserEdit from 'hocs/mutations/withUserEdit'

class UserForm extends React.Component {
  state = {
    loading: this.props.loading,
    user: this.props.user ||{},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState(prevState => ({
        ...prevState,
        loading: nextProps.loading,
        user: nextProps.user,
      }))
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ loading: true });
    this.props.editUser({
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
      password: this.state.user.password,
      birthday: this.state.user.birthday,
      birthplace: this.state.user.birthplace,
      phone1: this.state.user.phone1,
      phone2: this.state.user.phone2,
    }).then(res => {
      this.setState({ loading: false }, this.props.callback ? () => this.props.callback(res) : null);
      return res;
    });
  }

  handleChange = (ev, { name, value }) => {
    return this.setState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      }
    }))
  }

  render() {
    const { loading, user } = this.state;
    const {
      submitText = 'Sauvegarder'
    } = this.props;
    return (
      <Form loading={loading} onSubmit={this.handleSubmit}>

        <Form.Group widths='equal'>
          <Form.Input
            name="firstname"
            label='Prénom'
            value={user.firstname || ''}
            placeholder="Entrez votre prénom"
            onChange={this.handleChange}
          />
          <Form.Input
            name="lastname"
            label='Nom'
            value={user.lastname || ''}
            placeholder="Entrez votre nom"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            disabled
            name="email"
            label='Email'
            value={user.email || ''}
            placeholder="Entrez votre adresse email"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="password"
            label='Mot de passe'
            type='password'
            value={user.password || ''}
            placeholder="Nouveau mot de passe"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Message info>
          <Message.Header>Dois-je donner ma véritable identité ?</Message.Header>
          <p>Uniquement vos communautés peuvent voir votre identité.
            Plus vous renseignez d'informations personelles, plus il est facile de vous contacter en cas de besoin.
            <b>Communy n'exploite pas vos données personnelles.</b>
          </p>
        </Message>

        <Form.Group widths='equal'>
          <Form.Input
            name="birthday"
            type="date"
            label='Date de naissance'
            value={user.birthday || ''}
            placeholder="JJ/MM/AAAA"
            onChange={this.handleChange}
          />
          <Form.Input
            name="birthplace"
            label="Lieu de naissance"
            value={user.birthplace || ''}
            placeholder="Entrez votre ville de naissance"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            name="phone1"
            label='Téléphone principal'
            value={user.phone1 || ''}
            placeholder="Entrez votre numéro de téléphone"
            onChange={this.handleChange}
          />
          <Form.Input
            name="phone2"
            label='Téléphone secondaire'
            value={user.phone2 || ''}
            placeholder="Entrez votre numéro de téléphone"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Button>{submitText}</Form.Button>
      </Form>
    )
  }
}


export default withUserEdit(withCurrentUser(UserForm))
