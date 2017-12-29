import withCurrentUser from 'hocs/queries/withCurrentUser';
import Screenshot from 'components/web/misc/Screenshot'
import Calendar from 'containers/Event/Calendar'

import { Segment, Container } from 'semantic-ui-react'

export default withCurrentUser(({ user, loading, ...props }) => {

  if (loading) {
    return <div style={{
      height: 500,
      textAlign: 'center'
    }}>Chargement...</div>
  }

  if (!user) {
    return <Screenshot {...props} />
  }

  return (
    <Container>
      <Segment>
        <Calendar />
      </Segment>
    </Container>
  )
})
