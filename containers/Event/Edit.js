import React from 'react';
import { compose } from 'react-apollo';

import withEvent from 'hocs/queries/withEvent';
import withEventEdit from 'hocs/mutations/withEventEdit';

import EventForm from 'containers/Event/Form';

import './daypicker.css';

class EventEditForm extends React.Component {
  render() {
    const {
      editEvent,
      ...props
    } = this.props;
    return <EventForm
      submit={editEvent}
      submitText="Sauvegarder"
      {...props}
     />
  }
}

export default compose(
  withEvent,
  withEventEdit,
)(EventEditForm);
