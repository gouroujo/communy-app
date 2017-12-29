import withCurrentUser from 'hocs/queries/withCurrentUser';
import Navigation from 'components/web/misc/NavList'
import AppTitle from 'components/web/misc/Title'

export default withCurrentUser(({ user, loading, ...props }) => {

  if (loading) {
    return <div>Chargement</div>
  }

  if (!user) {
    return <AppTitle {...props} />
  }

  return <Navigation communities={user.registrations && user.registrations.map(registration => ({
    ...registration.organisation,
    registration: registration
  }))} />
})
