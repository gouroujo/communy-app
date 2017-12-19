import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { Button } from 'semantic-ui-react'
import Menu from 'components/web/misc/Menu'
import UserMenu from 'containers/User/Menu';

import withUser from 'hocs/queries/withUser';

class AppMenu extends React.PureComponent {
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <Menu value={1}>
          <Link href={process.browser ? window.__ENV__.INDEX_PAGE : process.env.INDEX_PAGE} as="/">
            <img src={this.props.logo} alt="Communy" />
          </Link>
          <UserMenu className="menu-item" user={user}/>
        </Menu>
      )
    }

    return (
      <Menu value={1}>
        <Link href={process.browser ? window.__ENV__.INDEX_PAGE : process.env.INDEX_PAGE} as="/">
          <img src={this.props.logo} alt="Communy" />
        </Link>
        <div className="menu-item">
          <Link href={{ pathname: '/login', query: { target: this.props.router.pathname, as: this.props.router.asPath } }}>
            <Button primary>Connexion</Button>
          </Link>
          <Link href={{ pathname: '/signin', query: { target: this.props.router.pathname, as: this.props.router.asPath } }}>
            <Button className="signin">Inscription</Button>
          </Link>
          <style jsx>{`
            .menu-item > :global(.signin) {
              display: none;
            }
            @media only screen and (min-width: 576px) {
              .menu-item > :global(.signin) {
                display: inline-block;
              }
            }
          `}</style>
        </div>

      </Menu>
    )
  }
}

export default withUser(withRouter(AppMenu))
