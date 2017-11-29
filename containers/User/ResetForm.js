import React from 'react';

import {
  Form,
  Message
} from 'semantic-ui-react';

class UserResetForm extends React.Component {
  state = {
    email: '',
    loading: false,
    success: false,
    error: false
  }

  handleChange = (ev, { name, value }) => {
    return this.setState(prevState => ({ ...prevState, [name]: value }))
  }

  handleReset = e => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, loading: true }), () => {
      return window.fetch(process.env.REACT_APP_RECOVER_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
        })
      })
      .then(res => {
        if (!res.ok) return res.text().then(e => { throw new Error(e) });
        this.setState(prevState => ({ ...prevState, loading: false, success: true, error: false }))
      })
      .catch(e => {
        console.log(e);
        this.setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
      });
    });
  }


  render() {
    const {
      email,
      loading,
      success,
      error,
    } = this.state;

    return (
      <div style={{ maxWidth: 300, textAlign: 'center', padding: 10, margin: '0 auto' }}>
        <Form loading={loading} onSubmit={this.handleReset}>
          <Form.Input label='Email' type='text' required name="email" value={email} onChange={this.handleChange}/>
          {success && (
            <Message negative>
              <Message.Header>Vous allez recevoir un email</Message.Header>
              <p>Un email contenant un lien pour ré-initialiser votre mot de passe viens de vous être envoyé.</p>
            </Message>
          )}
          {error && (
            <Message negative>
              <Message.Header>Une erreur s'est produite</Message.Header>
              <p>Nous n'arrivons pas à trouver de compte avec cette adresse email.</p>
            </Message>
          )}
          <Form.Button content='Ré-initialiser mon mot de passe' />
        </Form>
      </div>
    )
  }
}

export default UserResetForm
