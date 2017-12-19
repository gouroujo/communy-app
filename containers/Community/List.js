import React from 'react'
import gql from 'graphql-tag'

import withCommunities from 'hocs/queries/withCommunities'

import CommunityList from 'components/web/Community/List'
import SelectTag from 'components/web/Community/SelectTag'

import UserButtons from 'containers/Registration/UserButtons'

export const fragment = gql`
  fragment CommunityListFragment on Organisation {
    id
    title
    type
    logo
    cover
    nusers
    nevents
    registration {
      id
      ack
      confirm
    }
  }
`

export const query = gql`
  query CommunityList(
    $limit: Int
    $categories: [String!]
  ) {
    communities: organisations (limit: $limit, categories: $categories) {
      ...CommunityListFragment
    }
  }
  ${fragment}
`
export default class Communities extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        location: '',
        categories: []
      }
    }
  }

  handleChangeTag = (tags) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        categories: tags
      }
    }))
  }

  render () {
    const CommunityListWithData = withCommunities(query)(CommunityList)
    return (
      <div style={{ textAlign: 'center'}}>
        <SelectTag
          // inverted
          tags={this.state.filter.categories}
          onChange={this.handleChangeTag} />
        <CommunityListWithData
          {...this.state.filter}
          Action={(props) => (
            <UserButtons
              community={props.community}
              communityId={props.communityId}
              registration={props.community && props.community.registration} />
          )} />
      </div>
    )
  }
}
