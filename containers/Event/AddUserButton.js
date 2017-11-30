import React from 'react';
import debounce from 'lodash.debounce';
import { List, Image, Modal, Button, Input } from 'semantic-ui-react';
import AnswerButtons from 'containers/Event/AnswerButtons'

import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class AddUserButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: this.props.loading,
      search: '',
      open: false,
    }
    this.debouncedFetch = debounce(this.fetchOptions, 400)
  }

  componentDidMount() {
    this.fetchOptions();
  }

  fetchOptions = () => {
    this.setState({ loading: true })
    if(this.query) this.query.tearDownQuery()
    this.query = this.props.client.watchQuery({
      query: gql`
        query searchUsers (
          $search: String,
          $communityId: ID!,
          $eventId: ID!,
          $limit: Int
        ) {
          organisation(id: $communityId) {
            id
            registrations(search: $search, limit: $limit) {
              id
              user {
                id
                fullname
                avatar
                participation (eventId: $eventId) {
                  id
                  answer
                }
              }
            }
          }
        }
      `,
      variables: {
        search: this.state.search,
        communityId: this.props.communityId,
        eventId: this.props.eventId,
        limit: 10
      }
    });
    this.query.subscribe({
      next: ({ data: { organisation } }) => {
        this.setState({
          loading: false,
          users: organisation && organisation.registrations && organisation.registrations.map(r => r.user)
        })
      },
    })
  }

  handleChange = (e, { value }) => {
    this.setState({
      search: value,
      loading: true,
    }, this.debouncedFetch)
  }
  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })


  render () {
    const {
      open,
      search,
      users,
      loading
    } = this.state;
    const {
      eventId,
      style
    } = this.props
    return (
      <Modal dimmer="inverted" open={open} onClose={this.close} closeIcon
        trigger={<Button labelPosition='left' icon='add user' style={style} onClick={this.open} content="Ajouter des participants" />}>
        <Modal.Content>
          <div style={{ textAlign: 'center', marginBottom: 10}}>
            <Button onClick={this.close}>Fermer</Button>
          </div>
          <Input
            autoFocus
            fluid
            icon='users'
            iconPosition='left'
            loading={loading}
            value={search}
            placeholder='Rechercher un membre ...'
            onChange={this.handleChange}
          />
          <List>
            {users.map(user => (
              <List.Item key={user.id}>
                <List.Content floated='right'>
                  <AnswerButtons
                    userId={user.id}
                    eventId={eventId}
                    participation={user.participation}
                    compact
                  />
                </List.Content>
                <List.Content>
                  <List.Header>
                    {user.avatar && <Image avatar src={user.avatar} />}
                    {user.fullname}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Modal.Content>
      </Modal>
    )
  }
}

export default withApollo(AddUserButton);
