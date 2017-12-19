import React from 'react'

class UserInbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedMessageId: null
    }
  }

  handleSelectMessage = (selectedMessageId) => this.setState({ selectedMessageId })

  render() {
    const { selectedMessageId } = this.state
    return (
      <div className="inbox">
        <div className="filter">
          filter
        </div>
        <div className="list">
          List
        </div>
        <div className={`message${selectedMessageId ? '' : ' hidden'}`}>
          Message: {selectedMessageId}
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
          .filter {
            flex: 1;
            max-width: 300px;
            min-width: 100px;
            background-color: #999999;
            height: 100%;
          }
          .list {
            flex: 1;
            max-width: 400px;
            min-width: 100px;
            background-color: blue;
          }
          .message {
            flex: 2;
            background-color: yellow;
          }
        `}</style>
      </div>
    )
  }
}

export default UserInbox
