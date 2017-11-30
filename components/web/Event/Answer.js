import { Icon } from 'semantic-ui-react'

export default ({ answer, compact, style, ...props }) => {
  if (answer === 'YES') {
    return (
      <span style={{ color: '#21ba45', ...style}} {...props}>
        <Icon name="check" />
        {!compact && "Participe"}
      </span>
    )
  } else if (answer === 'MAYBE') {
    return (
      <span style={{ color: '#eaae00', ...style}} {...props}>
        <Icon name="help" />
        {!compact && "Participe peut-être"}
      </span>
    )
  } else if (answer === 'NO') {
    return (
      <span style={{ color: '#db2828', ...style}} {...props}>
        <Icon name="cancel" />
        {!compact && "Ne participe pas"}
      </span>
    )
  }

  return null
}
