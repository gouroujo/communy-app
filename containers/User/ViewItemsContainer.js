import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

// import UserEventList from 'containers/User/EventList'
import UserMessageList from 'containers/Message/List'

class UserViewItemsContainer extends React.PureComponent {
  render() {
    const { type, onSelectItem } = this.props

    return (
      <div>

        <div style={{ margin: '0.5em', textAlign: 'center' }}>
          <Button.Group basic>
            <Button icon active={type === 'events'}>
              <Icon name='calendar' />
            </Button>
            <Button icon active={type === 'inbox'}>
              <Icon name='mail' />
            </Button>
            {/* <Button icon active={ type === 'users'}>
              <Icon name='users' />
            </Button> */}
          </Button.Group>
        </div>

        {/* {(type === 'events') && (
          <UserEventList
            onClick={onSelectItem}
          />
        )} */}
        {(type === 'inbox') && (
          <UserMessageList
            onClick={onSelectItem}
          />
        )}
      </div>

    )
  }
}

export default UserViewItemsContainer
