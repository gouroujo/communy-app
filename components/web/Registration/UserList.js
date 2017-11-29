import React from 'react'
import Link from 'next/link'
import { List, Image } from 'semantic-ui-react'

class OrganisationRegistrationList extends React.PureComponent {
  render() {
    const {
      registrations,
      communityId,
      Rbutton,
      ...props
    } = this.props;

    if (!registrations) return null;

    return (
      <List selection verticalAlign='middle' {...props}>
        {registrations.map(registration => (
          <Link
            key={registration.id}
            href={`/community-registration?communityId=${communityId}&userId=${registration.user.id}`}
            as={`/communities/${communityId}/users/${registration.user.id}`}>
            <List.Item>
                {Rbutton && (
                  <List.Content floated='right'>
                    <Rbutton userId={registration.user.id} organisationId={communityId} registration={registration} />
                  </List.Content>
                )}
                <List.Content>
                  <List.Header>
                    {registration.user && registration.user.avatar && <Image avatar src={registration.user.avatar} />}
                    {registration.user && registration.user.fullname}
                  </List.Header>
                </List.Content>

            </List.Item>
          </Link>

        ))}
      </List>
    )
  }
}

export default OrganisationRegistrationList;
