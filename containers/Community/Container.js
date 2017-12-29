import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import Head from 'next/head'

import withCommunity from 'hocs/queries/withCommunity'
import CommunityFragment from 'fragments/Community'
import RegistrationFragment from 'fragments/Registration'

import { Card, Dimmer, Loader, Sticky, Header, Icon, Button } from 'semantic-ui-react'

import CommunityHeader from 'containers/Community/Header'
import CommunityMenu from 'components/web/Community/Menu'

export const query = gql`
  query CommunityView(
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      ...CommunityFragment
      registration {
        ...RegistrationFragment
      }
    }
  }
  ${CommunityFragment}
  ${RegistrationFragment}
`
class CommunityContainer extends React.PureComponent {
  state = {
    stick: false
  }

  componentDidMount() {
    this.scrollTo(280)
  }

  componentDidUpdate(prevProps) {
    if (this.props.communityId !== prevProps.communityId) {
      this.scrollTo(280)
    }
  }

  onStick = () => this.setState({ stick: true })
  onUnstick = () => this.setState({ stick: false })
  handleContextRef = contextRef => this.setState({ contextRef })

  scrollTo = (height) => {
    if (process.browser) {
      const scrollDuration = 450;
      const cosParameter = (window.pageYOffset - height) / 2;
      let scrollCount = 0;
      let oldTimestamp = window.performance.now();

      function step(newTimestamp) {
        let tsDiff = newTimestamp - oldTimestamp;
        if (tsDiff > 100) tsDiff = 30;
        scrollCount += Math.PI / (scrollDuration / tsDiff);
        if (scrollCount >= Math.PI) return window.scrollTo(0, height);
        // if (window.scrollY === height) return;
        window.scrollTo(0, Math.round(height + cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }
  }

  render() {
    const {
      loading,
      community,
      communityId,
    } = this.props;
    return (
      <div className="ui container communy-container">
        <Dimmer.Dimmable as={Card} dimmed={loading} fluid className="community">

          <Dimmer active={loading} inverted>
            <Loader>Chargement de la communauté...</Loader>
          </Dimmer>

          <Dimmer active={!loading && !community} inverted>
            <Header as='h2' icon textAlign='center'>
              <Icon name='search' circular/>
              <Header.Content>
                La communauté<br />
                "{communityId}"<br />
                n'a pas été trouvée<br /><br />
              </Header.Content>
              <Header.Subheader>
                <Link href={process.browser ? window.__ENV__.INDEX_PAGE : process.env.INDEX_PAGE} as="/"><Button primary>Retour</Button></Link>
              </Header.Subheader>
            </Header>
          </Dimmer>

          <Head>
            <title>Communy - {community ? community.title : 'Chargement...'}</title>
          </Head>
          <CommunityHeader communityId={communityId} />
          <div className="content" ref={this.handleContextRef}>
            <Sticky context={this.state.contextRef} offset={60} className="sticky" onStick={this.onStick} onUnstick={this.onUnstick}>
              <CommunityMenu communityId={communityId} permissions={community && community.registration && community.registration.permissions}/>
            </Sticky>
            <div className="children">
              {this.props.children}
            </div>

          </div>

        </Dimmer.Dimmable>
        <style jsx>{`
          .communy-container {
            /* max-width: 860px; */
            margin: 1em auto;
          }
          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .children {
            margin-top: ${this.state.stick ? '52px' : '10px'};
            padding-bottom: 2em;
            flex: 1;
            display: flex;
            flex-direction:column;
            align-items: stretch;
          }
        `}</style>
        <style jsx global>{`
          .sticky {
            z-index: 5;
          }
          .ui.card.community {
            min-height: calc(100vh - 67px);
            display: flex;
            flex-direction: column;
          }
          @media only screen and (max-width: 767px) {
            .ui.container.communy-container {
              margin: 0 !important;
            }
            .ui.container.communy-container > .segment,
            .ui.container.communy-container > .card {
              border-radius: 0 !important;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withCommunity(query)(CommunityContainer)
