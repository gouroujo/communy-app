import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'next/router';

import withEventCreate from 'hocs/mutations/withEventCreate';

import EventForm from 'containers/Event/Form';

class EventCreateForm extends React.Component {
  afterSubmit = (res) => {
    this.props.router.push(
      `/community-event?communityId=${this.props.communityId}&eventId=${res.data.event.id}`,
      `/communities/${this.props.communityId}/events/${res.data.event.id}`
    )
  }

  render() {
    const {
      createEvent,
      communityId,
      ...props
    } = this.props;
    return <EventForm
      submit={createEvent}
      callback={this.afterSubmit}
      submitText="Créer l'activité"
      communityId={communityId}
      {...props}
     />
  }
}

export default compose(
  withEventCreate,
  withRouter,
)(EventCreateForm);
