import WeekMonth from './CalendarWeekMonth';
import moment from 'moment';

export default ({ date, events}) => {
  const start = moment(date).date(1)
  return (
    <div className="CalendarMonth">
      <div className="header">
        <div>{moment.weekdaysShort(true, 0)}</div>
        <div>{moment.weekdaysShort(true, 1)}</div>
        <div>{moment.weekdaysShort(true, 2)}</div>
        <div>{moment.weekdaysShort(true, 3)}</div>
        <div>{moment.weekdaysShort(true, 4)}</div>
        <div>{moment.weekdaysShort(true, 5)}</div>
        <div>{moment.weekdaysShort(true, 6)}</div>
      </div>
      <WeekMonth week={moment(start)} date={date} events={events}/>
      <WeekMonth week={moment(start).date(8)} date={date} events={events}/>
      <WeekMonth week={moment(start).date(15)} date={date} events={events}/>
      <WeekMonth week={moment(start).date(22)} date={date} events={events}/>
      <WeekMonth week={moment(start).date(29)} date={date} events={events}/>
      <WeekMonth week={moment(start).date(36)} date={date} events={events}/>
      <style jsx>{`
        .CalendarMonth {
          display: flex;
          height: 700px;
          width: 100%;
          flex-direction: column;
          align-items: stretch;
        }
        .CalendarMonth > .header {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-bottom: 2px solid #d0cdcd;
        }
        .CalendarMonth > .header > div {
          flex: 1 1 14%;
          text-align: right;
          padding: 7px;
          font-size: 1.1em;
        }
      `}</style>
    </div>
  )
}
