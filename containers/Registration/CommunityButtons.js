import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

import ButtonWithConfirm from 'components/web/misc/ButtonWithConfirm'
import withCommunityRegistrationActions from 'hocs/mutations/withCommunityRegistrationActions'

class CommunityRegistrationButtons extends React.PureComponent {

  render() {
    const {
      registration,
      removeUser,
      confirmUser,
    } = this.props

    if (registration && !registration.ack && registration.confirm) {
      return <Button
        disabled
        content='En attente'
        icon='wait'
        labelPosition='left' />
    }

    if (registration && !registration.confirm && registration.ack) {
      return (
        <Button.Group>
          <Button
            positive
            onClick={confirmUser}>
            <Icon name="checkmark" />
            Accepter
          </Button>
        <Button.Or text='ou' />
        <Button
          color='red'
          onClick={removeUser}>
          <Icon name="remove" />
          Refuser
        </Button>
      </Button.Group>
      )
    }

    if (registration && registration.confirm && registration.ack) {
      return (
        <ButtonWithConfirm
          negative
          modalIcon="trash"
          onConfirm={removeUser}
          modalTitle={`Retirer ${registration.user.fullname}`}
          modalContent={`Souhaitez-vous supprimer ${registration.user.fullname} de la communauté ?`}
        >
          <Icon name="trash" />
          Retirer
        </ButtonWithConfirm>
      )
    }

    return null
  }
}

export default withCommunityRegistrationActions(CommunityRegistrationButtons)
