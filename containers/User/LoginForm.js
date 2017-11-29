import React from 'react';
import { compose } from 'react-apollo';

import { Form, Divider, Button, Icon } from 'semantic-ui-react'

// import Message from 'semantic-ui-react/dist/es/collections/Message';

import withFacebookConnect from 'hocs/withFacebookConnect';
import withUserSignWithFacebook from 'hocs/mutations/withUserSignWithFacebook';
import withUserLogin from 'hocs/mutations/withUserLogin';

class UserLoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    stayLogged: true,
    loading: false,
  }

  handleFacebookConnect = () => {
    this.setState(prevState => ({ ...prevState, loading: 'facebook' }), () => {
      this.props.connectFacebook((err, data) => {
        if (err || !data) {
          return this.setState(prevState => ({ ...prevState, loading: false, error: 'facebook' }))
        }
        this.props.signWithFacebook(data, this.state.stayLogged)
          .then(() => this.props.callback && setTimeout(this.props.callback, 0))
          .catch(e => {
            console.log(e)
            this.setState(prevState => ({ ...prevState, loading: false, error: 'facebook' }))
          });
      })
    });
  }

  handleChange = (ev, { name, value }) => {
    return this.setState(prevState => ({ ...prevState, [name]: value }))
  }

  handleLogin = e => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, loading: 'simple' }), () => {
      return this.props.login({
        email: this.state.email,
        password: this.state.password,
      })
      .then(() => this.props.callback && setTimeout(this.props.callback, 0))
      .catch(e => {
        console.log(e)
        this.setState(prevState => ({ ...prevState, loading: false, error: 'simple' }))
      });
    });
  }


  render() {
    const {
      email,
      password,
      loading
    } = this.state;

    return (
      <div style={{ maxWidth: 300, textAlign: 'center', padding: 10, margin: '0 auto' }}>
        <Button.Group vertical fluid>
          <Button color='facebook' onClick={this.handleFacebookConnect} loading={loading === 'facebook'}>
            <Icon name='facebook' /> Continuer avec Facebook
          </Button>
          {/* <Button color='google plus'>
            <Icon name='google plus' /> Continuer avec Google
          </Button> */}
        </Button.Group>

        <Divider horizontal>OU</Divider>

        <Form loading={loading === 'simple'} onSubmit={this.handleLogin}>
          <Form.Input label='Email' type='text' required name="email" value={email} onChange={this.handleChange}/>
          <Form.Input label='Mot de passe' type='password' required name="password" value={password} onChange={this.handleChange}/>
          <Form.Field>
            <Form.Checkbox label='Rester connecté sur cet appareil' name='stayLogged' checked={this.state.stayLogged} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Button content='Connexion' />
        </Form>
      </div>
    )
  }
}

export default compose(
  withFacebookConnect,
  withUserSignWithFacebook,
  withUserLogin
)(UserLoginForm)
