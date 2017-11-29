import withUser from 'hocs/queries/withUser';
import Screenshot from 'components/web/misc/Screenshot'
import Calendar from 'containers/Event/Calendar'

import { Segment, Container } from 'semantic-ui-react'

export default withUser(({ user, loading, ...props }) => {

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
