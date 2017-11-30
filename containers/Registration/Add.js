import React from 'react';
import { Form, Message, Divider } from 'semantic-ui-react'

import withCommunityAddUsers from 'hocs/mutations/withCommunityAddUsers';

class OrganisationAddUser extends React.Component {
  state = {
    error: false,
    success: false,
    loading: false,
    users: [{
      email: '',
      firstname: '',
      lastname: '',
    }],
    message: ''
  }

  handleInvite = (ev) => {
    ev.preventDefault();
    this.setState({ loading: true, error: false, success: false }, () => {
      this.props.addUsersToCommunity(this.state.users.filter(user => user.email), this.state.message)
      .then(() => {
        this.setState({
          loading: false,
          success: true,
          users: [{
            email: '',
            firstname: '',
            lastname: '',
          }],
         })
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false, error: true })
      })
    })
  };

  handleChange = (i, ev, { value, name }) => {
    this.setState(prevState => {
      const { users } = prevState
      users[i][name] = value;

      if (users[users.length - 1].email || users[users.length - 1].firstname || users[users.length - 1].lastname) {
        users.push({ email: '', firstname: '', lastname: ''})
      }

      if (!users[i].email && !users[i].firstname && !users[i].lastname) {
        users.splice(i, 1)
      }

      return { users }
    })
  }

  handleUpdate = (ev, { value, name }) => {
    return this.setState({ [name]: value })
  }

  handleRemove = (i) => {
    this.setState(prevState => {
      const { users } = prevState
      users.splice(i, 1)
      return { users }
    })
  }

  render() {
    const {
      loading,
      users,
      error,
      success,
      message
    } = this.state;
    return (
        <Form loading={loading} onSubmit={this.handleInvite} error={error} success={success}>
          {users.map((user, i) => {
            return (
              <div key={i}>
                {(i === (users.length - 1)) && <Divider horizontal>Inviter un nouveau membre</Divider>}
                <Form.Group style={{ marginBottom: 10 }}>
                  <Form.Input
                    width={5}
                    value={user.email}
                    onChange={(ev) => this.handleChange(i, ev, ev.target)}
                    name="email"
                    placeholder="Email"
                    required={users.length === 1 || (users.length - 1) !== i}
                  />
                  <Form.Input width={5} value={user.firstname} onChange={(ev) => this.handleChange(i, ev, ev.target)} name= "firstname" placeholder="Prénom" />
                  <Form.Input width={5} value={user.lastname} onChange={(ev) => this.handleChange(i, ev, ev.target)} name="lastname" placeholder='Nom' />
                  {(user.email || user.firstname || user.lastname) && (
                    <Form.Button
                      onClick={() => this.handleRemove(i)}
                      type="button" width={1} icon="trash" negative />
                  )}
                </Form.Group>
              </div>
            )
          })}
          <Form.TextArea
            autoHeight
            name="message"
            label='Message'
            value={message}
            placeholder="Vous pouvez ajouter un message dans l'invitation"
            onChange={this.handleUpdate}
          />
            <Message
              error
              header='Un problème est survenu'
              content='Merci de réessayer ultèrieurement. Vous pouvez également nous envoyer un email avec la liste des utilisateurs que vous souhaitiez ajouter à support@communy.org'
            />
            <Message
              success
              header="Merci !"
              content="Les invitations sont en cours d'acheminement..."
            />
            <div style={{ textAlign: 'center' }}>
              <Form.Button primary disabled={users.length < 2} type="submit">Inviter {users.length - 1} membre{users.length < 3 ? '' : 's'}</Form.Button>
            </div>

        </Form>
    )
  }
}

export default withCommunityAddUsers(OrganisationAddUser)
