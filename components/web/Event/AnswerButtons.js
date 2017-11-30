import { Button, Icon } from 'semantic-ui-react'
import pick from 'lodash.pick'

export default ({ answer, onChange, compact, ...props }) => {
  const isYes = answer === 'YES'
  const isMb = answer === 'MAYBE'
  const isNo = answer === 'NO'

  return (
    <Button.Group {...pick(props, [
      'fluid'
    ])}>
      <Button
        active={isYes}
        basic={!isYes}
        color='green'
        onClick={(ev) => onChange(ev, 'YES')}>
        <Icon name="check" />
        {!compact && "Oui"}
      </Button>
      <Button
        active={isMb}
        basic={!isMb}
        color='yellow'
        onClick={(ev) => onChange(ev, 'MAYBE')}>
        <Icon name="help" />
        {!compact && "Peut-être"}
      </Button>
      <Button
        active={isNo}
        basic={!isNo}
        color='red'
        onClick={(ev) => onChange(ev, 'NO')}>
        <Icon name="cancel" />
        {!compact && "Non"}
      </Button>
    </Button.Group>
  )
}
