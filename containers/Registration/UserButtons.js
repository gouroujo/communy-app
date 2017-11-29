import React from 'react'
import { compose } from 'react-apollo'

import ButtonWithConfirm from 'components/web/misc/ButtonWithConfirm'

import withLoginBefore from 'hocs/withLoginBefore'
import withUser from 'hocs/queries/withUser'
import withUserRegistrationActions from 'hocs/mutations/withUserRegistrationActions'

import { Button, Icon } from 'semantic-ui-react';

const UserRegistrationButtons = ({
  fluid,
  community,
  registration,
  addCommunity,
  removeCommunity,
  ackCommunity,
  loginBefore
}) => {
  if (registration && registration.ack && !registration.confirm) {
    return <Button
      fluid={fluid}
      disabled
      content='En attente'
      icon='wait'
      labelPosition='left' />
  }

  if (registration && registration.confirm && !registration.ack) {
    return (
      <Button.Group fluid={fluid}>
        <Button
          positive
          onClick={ackCommunity}>
          <Icon name="checkmark" />
          Accepter
        </Button>
      <Button.Or text='ou' />
      <Button
        color='red'
        onClick={removeCommunity}>
        <Icon name="remove" />
        Refuser
      </Button>
    </Button.Group>
    )

  }

  if (registration && registration.confirm && registration.ack) {
    return <ButtonWithConfirm
      fluid={fluid}
      basic
      negative
      modalIcon="trash"
      onConfirm={removeCommunity}
      modalTitle={`Quiter ${community ? community.title : ''}`}
      modalContent={`Souhaitez-vous vraiment quitter la communauté ${community ? community.title : ''} ?`}
    >
      <Icon name="trash" />
      Quitter
    </ButtonWithConfirm>

  }

  if (community) {
    return (
      <ButtonWithConfirm
        fluid={fluid}
        primary
        modalIcon="add circle"
        onConfirm={loginBefore(addCommunity)}
        modalTitle={`Rejoindre ${community.title}`}
        modalContent={`Souhaitez-vous rejoindre la communauté ${community.title} ?`}
      >
        <Icon name="add" />
        Rejoindre {community.title}
      </ButtonWithConfirm>
    )
  }

  return null
}

export default compose(
  withUser,
  withLoginBefore,
  withUserRegistrationActions
)(UserRegistrationButtons);
