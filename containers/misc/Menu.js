import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { Button } from 'semantic-ui-react'
import Menu from 'components/web/misc/Menu'
import UserMenu from 'containers/User/Menu';

import withUser from 'hocs/queries/withUser';

// import image from 'static/images/logo.svg'


class AppMenu extends React.PureComponent {
  state = {
    value: 0,
    isMobile: process.browser ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 480 : false
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
        <Menu value={this.state ? this.state.value : 0}>
          <Link href={process.browser ? window.__ENV__.INDEX_PAGE : process.env.INDEX_PAGE} as="/">
            <img src={this.props.logo} alt="Communy" />
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
      <Menu value={this.state ? this.state.value : 0}>
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
