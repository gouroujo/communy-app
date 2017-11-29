import React from 'react'
import Link from 'next/link'
import { withApollo } from 'react-apollo'
import cookie from 'cookie'
import redirect from 'lib/redirect'

import { Dropdown, Image } from 'semantic-ui-react'

class UserMenu extends React.PureComponent {
  handleSignOut = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.resetStore().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/')
    })
  }

  render() {
    const { mobile, user } = this.props
    return (
      <div className={this.props.className}>
        <Dropdown trigger={(
          <div>
            <Image avatar src={user && user.avatar} />
            <span style={{
              marginBottom: '-0.3em',
              maxWidth: '20vw',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: 'inline-block'
            }}>{ mobile || !user ? '' : user.fullname}</span>
          </div>
        )} pointing='top right' icon={null}>

          <Dropdown.Menu>
            <Link href="/profile">
              <Dropdown.Item icon='user' text='Profile'/>
            </Link>

            <Dropdown.Divider />

            <Dropdown.Item icon='sign out' text='Déconnexion' onClick={this.handleSignOut}/>
          </Dropdown.Menu>

        </Dropdown>
      </div>
    )
  }
}

export default withApollo(UserMenu)