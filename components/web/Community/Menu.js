import { Menu } from 'semantic-ui-react'
import Link from 'components/web/misc/ActiveLink'

export default ({ communityId }) => (
  <Menu>
    <Link
      exact
      href={`/community?communityId=${communityId}`}
      as={`/communities/${communityId}`}
      >
      <Menu.Item>
        À propos
      </Menu.Item>
    </Link>
    <Link
      href={`/community-events?communityId=${communityId}`}
      as={`/communities/${communityId}/events`}
      >
      <Menu.Item>
        Activités
      </Menu.Item>
    </Link>
    <Link
      href={`/community-registrations?communityId=${communityId}`}
      as={`/communities/${communityId}/users`}
      >
      <Menu.Item>
        Membres
      </Menu.Item>
    </Link>
  </Menu>
)
