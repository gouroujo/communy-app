
export default (role) => {
  switch(role) {
    case 'ADMIN': {
      return { label: 'Administrateur', icon: 'star', color: 'yellow'}
    }
    case 'MODERATOR': {
      return { label: 'Gestionnaire', icon: 'angle double up', color: 'red'}
    }
    case 'MEMBER': {
      return { label: 'Membre', icon: 'angle up', color: 'red'}
    }
    default: {
      return null
    }
  }
}
