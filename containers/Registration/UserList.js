import React from 'react'
import gql from 'graphql-tag';

import RegistrationUserListComponent from 'components/web/Registration/UserList'
import RegistrationCommunityButtons from 'containers/Registration/CommunityButtons'

export const fragment = gql`
  fragment RegistrationUserListFragment on Registration {
    id
    ack
    confirm
    role
    user {
      id
      fullname
      avatar
    }
  }
`
class RegistrationUserList extends React.PureComponent {
  render() {
    const { registrations, communityId, ...props } = this.props;

    return <RegistrationUserListComponent
      registrations={registrations}
      communityId={communityId}
      Rbutton={(ownProps) => (
        <RegistrationCommunityButtons communityId={communityId} {...ownProps} />
      )}
      {...props}
    />
  }
}

export default RegistrationUserList
