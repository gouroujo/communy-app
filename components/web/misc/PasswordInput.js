import React from 'react';
import { Progress, Input, Label } from 'semantic-ui-react'

export default class PasswordInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      strong: 0
    }
  }

  onChange = (ev, props) => {
    const score = this.scorePassword(props.value)
    this.setState(prevState => ({
      strong: score,
      error: prevState.error && !(score >= 50)
    }), () => {
      props.strong = this.state.strong >= 50
      this.props.onChange(ev, props)
    })
  }

  onBlur = () => {
    this.setState(prevState => ({ error: prevState.strong > 0 && !(prevState.strong >= 50)}))
  }

  getColor = (value) => {
    if (value < 10) return 'red'
    if (value < 40) return 'orange'
    if (value < 50) return 'yellow'
    if (value >= 50) return 'green'
  }

  scorePassword = (pass) => {
    let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    const letters = {};
    for (let i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    const variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (const check in variations) {
        variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
  }

  render() {
    const {
      onChange,
      ...props
    } = this.props
    return (
      <div>
        <Input onChange={this.onChange} onBlur={this.onBlur} error={props.error || this.state.error} {...props} style={{ width: '100%', ...props.style}}/>
        {this.state.strong > 0 && <Progress percent={this.state.strong} attached='bottom' color={this.getColor(this.state.strong)} />}
        {this.state.error && <Label basic color='red' pointing style={{ width: 'inherit'}}>Minimum 6 caractères différents avec une majuscule et un chiffre</Label>}
      </div>
    )
  }
}
