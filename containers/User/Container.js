import React from 'react'

class UserContainer extends React.PureComponent {

  render() {
    return (
      <div className="ui container segment user-container">
          {this.props.children}
        <style jsx>{`
          .user-container {
            margin: 1em auto !important;
            flex: 1;
          }
        `}</style>
        <style jsx global>{`
          @media only screen and (max-width: 767px) {
            .ui.container.user-container {
              margin: 0 !important;
            }
            .ui.container.user-container > .segment,
            .ui.container.user-container > .card {
              border-radius: 0 !important;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default UserContainer
