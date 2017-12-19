import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'

import UserLoginForm from 'containers/User/LoginForm'
import UserSigninForm from 'containers/User/SigninForm'
import UserResetForm from 'containers/User/ResetForm'

export default function(WrappedComponent) {
  return class extends React.PureComponent {
    static contextTypes = {
      user: PropTypes.object
    }

    state = {
      open: false,
      resetPassword: false,
      signin: true,
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
        if (this.props.user) return next(params)
        return new Promise(resolve => {
          this.setState({ open: true })
          this.callback = () => setTimeout(resolve(next(params)), 0)
        })
      }
    }
    render() {
      const { open } = this.state
      return [
        <Modal key="modal" open={open} onClose={this.close}>
          <Modal.Header>{this.state.resetPassword ? 'Mot de passe perdu' : 'Connexion'}</Modal.Header>

          <Modal.Content image>
            {this.state.resetPassword &&  <UserResetForm />}
            {this.state.signin && <UserSigninForm callback={this.callback}/>}
            {!this.state.resetPassword && !this.state.signin && <UserLoginForm callback={this.callback}/>}
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
