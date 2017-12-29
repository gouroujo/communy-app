import React from 'react'
import unionBy from 'lodash/unionBy'
import { Dropdown } from 'semantic-ui-react'

import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import UserMinFragment from 'fragments/UserMin'

class UserDropdown extends React.PureComponent {
  state = {
    options: [],
    loading: this.props.loading,
    searchQuery: '',
  }

  fetchOptions = () => {
    this.setState({ loading: true })
    this.props.client.query({
      query: gql`
        query searchUsers ($search: String, $communityId: ID!) {
          community: organisation(id: $communityId) {
            id
            registrations(search: $search, limit: 10) {
              id
              user {
                ...UserMinFragment
              }
            }
          }
        }
        ${UserMinFragment}
      `,
      variables: {
        search: this.state.searchQuery,
        communityId: this.props.communityId
      }
    })
    .then(({ data: { community } }) => {
      this.setState(prevState => ({
        loading: false,
        options: unionBy(
          prevState.options,
          community.registrations.map(({ user }) => ({
            key: user.id,
            avatar: user.avatar,
            text: user.fullname,
            value: user.id,
          })), 'key')
      }))
    })
  }
  handleChange = (e, { value }) => {
    this.props.onChange(value);
    this.setState({ searchQuery: '' })
  }
  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery }, this.fetchOptions)
  }
  renderLabel = label => ({
    content: label.text,
    className: 'image',
    image: label.avatar,
  })

  render () {
    return (
      <Dropdown
        multiple
        selection
        search
        placeholder={this.props.placeholder}
        value={this.props.value}
        options={this.state.options}
        renderLabel={this.renderLabel}
        onChange={this.handleChange}
        noResultsMessage="Aucun membre correspondant"
        onSearchChange={this.handleSearchChange}
        loading={this.state.loading}
      />
    )
  }
}

export default withApollo(UserDropdown);
