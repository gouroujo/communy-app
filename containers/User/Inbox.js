import React from 'react'

import UserViewItemsContainer from 'containers/User/ViewItemsContainer'
import EventContainer from 'containers/Event/Container'
import EventView from 'containers/Event/View'

class UserInbox extends React.PureComponent {
    state = {
      itemId: this.props.itemId,
      type: this.props.type || 'inbox',
    }

  handleSelectType = (type) => this.setState({ type, itemId: null })
  handleSelectItem = (itemId) => this.setState({ itemId })

  render() {
    const { itemId, type } = this.state
    return (
      <div className="inbox">

        <div className="list">
          <UserViewItemsContainer
            itemId={itemId}
            type={type}
            onSelectItem={this.handleSelectItem}
           />
        </div>

        <div className="item">

        {(type === 'events') && itemId && (
          <EventContainer
            eventId={itemId}>
            <EventView
              eventId={itemId}
            />
          </EventContainer>
        )}

        </div>
        <style jsx>{`
          .inbox {
            position: absolute;
            bottom: 0;
            top: 0;
            right: 0;
            left: 0;
            display: flex;
            align-items: stretch;
          }
          .list {
            flex: 1;
            max-width: 400px;
            min-width: 100px;
            overflow-y: scroll;
          }
          .item {
            flex: 2;
            border-left: 1px solid #acacac;
            padding-top: 1em;
          }
        `}</style>
      </div>
    )
  }
}

export default UserInbox
