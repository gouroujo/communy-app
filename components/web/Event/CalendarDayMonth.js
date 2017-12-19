import moment from 'moment';
import Link from 'next/link';

export default ({ day, date, events = []}) => {
  const dayNumber = parseInt(day.format('D'), 10);
  let className = "DayMonth";
  if (moment().isSame(day, 'day')) className += " today";
  if (day.isoWeekday() > 5 ) className += " weekend";
  if (date.month() !== day.month()) className += " nextMonth";
  return (
    <div className={className}>
      <div className="header">
        <span>{dayNumber} {(dayNumber === 1) && day.format('MMM')}</span>
      </div>
      <div className="events">
        {events.map(event => (
          <div key={event.id} className={`MonthEvent ${event.participation && event.participation.answer}`}>
            <Link href={`/community-event?communityId=${event.community.id}&eventId=${event.id}`}
              as={`/communities/${event.community.id}/events/${event.id}`}
            >
              <a className="title">{event.title}</a>
            </Link>
            <div className="time">{moment(event.startTime).format('hh:mm')}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .DayMonth {
          flex: 1 1 14%;
          display: flex;
          flex-direction: column;
          min-width: 0;
          border-bottom: 1px solid #dedddd;
          border-right: 1px solid #dedddd;
        }
        .DayMonth:first-child {
          border-left: 1px solid #dedddd;
        }
        .DayMonth > .header {
          text-align: right;
          padding: 7px;
          font-size: 1.2em;
        }
        .DayMonth.nextMonth > .header {
          color: #dedddd;
        }
        .DayMonth.today > .header > span {
          color: #fff;
          padding: 0 0.3em;
          background-color: red;
          border-radius: 1.2em;
        }

        .DayMonth.weekend {
          background-color: #f4f4f4;
          color: #878686;
        }
        .DayMonth > .events {
          flex: 1;
        }
        .MonthEvent {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          color: initial;
          margin: 2px;
          padding: 0 2px;
          line-height: 1.1em;
          border-radius: 2px;
        }
        .MonthEvent a {
          color: inherit;
          text-decoration: none;
        }
        .MonthEvent.YES {
          color: white;
          background-color: #21ba45;
        }
        .MonthEvent.MAYBE {
          color: white;
          background-color: #fbbd08;
        }
        .MonthEvent.NO {
          color: white;
          background-color: #db2828;
          opacity: 0.3;
        }
        .MonthEvent .title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.9em;
        }
        .MonthEvent .time {
          margin: 0 -1px 0 5px;
          font-size: 0.8em;
          color: #878686;
        }
        .MonthEvent.YES .time,
        .MonthEvent.MAYBE .time,
        .MonthEvent.NO .time {
          color: #edebeb;
        }
      `}</style>
    </div>
  )
}
