import React from 'react';
import Link from 'next/link';

import { Button } from 'semantic-ui-react'
import Menu from 'components/web/misc/Menu'
import UserMenu from 'containers/User/Menu';

import withUser from 'hocs/queries/withUser';

// import image from 'static/images/logo.svg'


class AppMenu extends React.PureComponent {
  static getInitialState() {
    return {
      value: 0,
      isMobile: process.browser ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 480 : false
    }
  }

  componentDidMount() {
    if (process.browser) {
      this.listener = window.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateMenu(window.scrollY)
            this.ticking = false;
          });
        }
        this.ticking = true;
      });
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      window.removeEventListener('scroll', this.listener)
    }
  }

  updateMenu = (scroll) => {
    this.setState({ value: Math.min(1, scroll * 0.01)})
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <Menu value={this.state ? this.state.value : 0} mobile={false}>
          <Link href="/">
            <img src="/static/images/logo_white.png" alt="Communy" />
          </Link>
          {/* <Link href="/inbox">
          <div className="menu-item">
            {user && user.nunreadMessage > 0 ? (
              <div style={{
                backgroundColor: 'red',
                padding: '5px 5px',
                borderRadius: '1em',
                color: 'white'
              }}><Icon name='mail outline' />{user.nunreadMessage}</div>
            ) : (
              <Icon name='mail outline' />
            )}
          </div>
          </Link> */}
          <UserMenu className="menu-item" user={user} mobile={this.state && this.state.isMobile} />
        </Menu>
      )
    }

    return (
      <Menu value={0} mobile={false}>
        <Link href="/">
          <img src="/static/images/logo.svg" alt="Communy" />
        </Link>
        <div className="menu-item">
          <Link href="/login">
            <Button primary>Connexion</Button>
          </Link>
          <Link href="/signin">
            <Button>Inscription</Button>
          </Link>
        </div>
      </Menu>
    )
  }
}

export default withUser(AppMenu);