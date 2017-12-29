import React from 'react'
import { List, Image, Icon } from 'semantic-ui-react'

import withCurrentUser from 'hocs/queries/withCurrentUser';

class UserNavMenu extends React.PureComponent {

  render() {
    const { user, communityId, onSelect } = this.props
    if (!user) return null
    if (!user.registrations || user.registrations.length === 0) {
      return (
        <div>
          Vide
        </div>
      )
    }

    return (
      <List divided relaxed selection>
        {user.registrations.map(registration => (
          <List.Item
            key={registration.id}
            active={registration.organisation.id === communityId}
            onClick={() => onSelect(registration.organisation.id)}
            >
            <List.Content floated='right' verticalAlign='middle'>
              <Icon name="chevron right" />
            </List.Content>
            <Image avatar src={registration.organisation.logo} />
            <List.Content verticalAlign='middle'>
              <List.Header as='a'>{registration.organisation.title}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    )
  }
}

export default withCurrentUser(UserNavMenu)
