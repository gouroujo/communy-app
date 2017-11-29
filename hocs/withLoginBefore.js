import React from 'react';
import { Modal, Button } from 'semantic-ui-react'

import UserLoginForm from 'containers/User/LoginForm';
import UserSigninForm from 'containers/User/SigninForm';
import UserResetForm from 'containers/User/ResetForm';

export default function(WrappedComponent) {
  return class extends React.PureComponent {
    state = {
      open: false,
      resetPassword: false,
      signin: true,
      callback: null,
    }

    open = () => {
      this.setState(prevState => ({ ...prevState, open: true }))
    }
    close = () => {
      this.setState(prevState => ({ ...prevState, open: false }))
    }

    resetPassword = () => {
      this.setState(prevState => ({ resetPassword: !prevState.resetPassword }))
    }
    signin = () => {
      this.setState(prevState => ({ signin: !prevState.signin, resetPassword: false }))
    }

    loginBefore = (next) => {
      return (params) => {
        if (this.props.user) return next(params);
        this.setState({ open: true, callback: next })
      }
    }
    render() {
      const { open } = this.state
      return [
        <Modal key="modal" open={open} onClose={this.close}>
          <Modal.Header>{this.state.resetPassword ? 'Mot de passe perdu' : 'Connexion'}</Modal.Header>

          <Modal.Content image>
            {this.state.resetPassword &&  <UserResetForm />}
            {this.state.signin && <UserSigninForm callback={this.state.callback}/>}
            {!this.state.resetPassword && !this.state.signin && <UserLoginForm callback={this.state.callback}/>}
          </Modal.Content>

          <Modal.Actions>
            <Button basic content={this.state.signin ? "Déja un compte ? Se connecter" : "Pas de compte ? S'inscrire"} onClick={this.signin}/>
            {!this.state.signin && <Button basic icon='lock' content={this.state.resetPassword ? 'Se connecter' : 'Mot de passe oublié ?'} onClick={this.resetPassword}/>}
          </Modal.Actions>

        </Modal>,
        <WrappedComponent key="component" loginBefore={this.loginBefore} {...this.props} />
      ]
    }
  }
}
