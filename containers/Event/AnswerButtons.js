import React from 'react'
import AnswerButtonsComponent from 'components/web/Event/AnswerButtons'

import withEventAnswer from 'hocs/mutations/withEventAnswer'

class AnswerButtons extends React.PureComponent {

  handleAnswer = (ev, answer) => {
    ev.preventDefault()
    ev.stopPropagation()
    this.props.eventAnswer(answer)
  }

  render () {
    const { event, participation, ...props } = this.props
    return (
      <AnswerButtonsComponent
        disabled={event && !event.open}
        answer={participation && participation.answer}
        onChange={this.handleAnswer}
        {...props}
      />
    )
  }
}

export default withEventAnswer(AnswerButtons)
