import moment from 'moment'

export default ({ start, end }) => {
  const s = moment(start)
  const e = moment(end)
  return `le ${s.format('DD/MM/YY')} de ${s.format('LT')} à ${e.format('LT')}`
}
