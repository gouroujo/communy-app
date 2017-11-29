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
    const { participation, ...props } = this.props
    return (
      <AnswerButtonsComponent
        answer={participation && participation.answer}
        onChange={this.handleAnswer}
        {...props}
      />
    )
  }
}

export default withEventAnswer(AnswerButtons)
