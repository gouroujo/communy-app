import React from 'react';
import { compose } from 'react-apollo';

import {
  Form,
  Divider,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react'

import PasswordInput from 'components/web/misc/PasswordInput';

import withFacebookConnect from 'hocs/withFacebookConnect';
import withUserSignWithFacebook from 'hocs/mutations/withUserSignWithFacebook';
import withUserSignin from 'hocs/mutations/withUserSignin';

class SigninForm extends React.PureComponent {

  state = {
    email: '',
    password: '',
    lastname: '',
    firstname: '',
    birthday: '',
    strongPassword: true,
    stayLogged: true,
    loading: false,
    error: null,
  }

  handleChange = (ev, { name, value }) => {
    return this.setState(prevState => ({ ...prevState, [name]: value }))
  }

  handleChangePassword = (ev, { value, strong }) => {
    return this.setState({ password: value, strongPassword: strong })
  }

  handleFacebookConnect = () => {
    this.setState(prevState => ({ ...prevState, loading: 'facebook' }), () => {
      this.props.connectFacebook((err, data) => {
        if (err || !data) {
          return this.setState(prevState => ({ ...prevState, loading: false, error: 'facebook' }))
        }
        this.props.signWithFacebook(data, this.state.stayLogged)
      })
    });
  }

  handleSignin = e => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, loading: 'simple' }), () => {
      return this.props.signin({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        birthday: this.state.birthday,
      })
    });
  }

  render () {
    const {
      loading,
      error,
      email,
      password,
      firstname,
      lastname,
      birthday,
      strongPassword
    } = this.state;
    return (
      <div style={{ maxWidth: 500, textAlign: 'center', padding: 10, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Button.Group vertical >
            <Button color='facebook' onClick={this.handleFacebookConnect} loading={loading === 'facebook'}>
              <Icon name='facebook' /> S'inscrire avec Facebook
            </Button>
            {/* <Button color='google plus'>
              <Icon name='google plus' /> Continuer avec Google
            </Button> */}
          </Button.Group>
        </div>


        <Divider horizontal>OU</Divider>

        <Form loading={loading === 'simple' } onSubmit={this.handleSignin}>
          {error === 'simple' && (
            <Message
              error
              header='Un compte avec cette adresse email existe déja !'
              content='Essayer de vous connecter avec votre adresse email.'
            />
          )}
          <Form.Group>
            <Form.Input width={8} placeholder='Prénom*' type='text' required name="firstname" value={firstname} onChange={this.handleChange}/>
            <Form.Input width={8} placeholder='Nom*' type='text' required name="lastname" value={lastname} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Input placeholder='Email*' type='text' required name="email" value={email} onChange={this.handleChange}/>
          <Form.Field>
            <PasswordInput placeholder='Mot de passe*' type='password' required name="password" value={password} onChange={this.handleChangePassword} />
          </Form.Field>
          {/* <Form.Input /> */}
          <Form.Group inline>
            <Form.Input label='Date de naissance :' type='date' required name="birthday" placeholder="AAAA-MM-JJ" value={birthday} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Field>
            <Form.Checkbox label='Rester connecté sur cet appareil' name='stayLogged' checked={this.state.stayLogged} onChange={this.handleChange}/>
          </Form.Field>
          <p style={{ fontSize: '0.8em', margin: '5px 0.3em'}}>
            En cliquant sur le bouton "Créer un compte", vous déclarez accepter nos <a href="/cgu" target="_blank">Conditions</a>.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Form.Button type="submit" positive content='Créer un compte' disabled={!strongPassword || !email || !password || !firstname || !lastname || !birthday}/>
          </div>
        </Form>
      </div>
    )
  }
}

export default compose(
  withFacebookConnect,
  withUserSignWithFacebook,
  withUserSignin
)(SigninForm)
