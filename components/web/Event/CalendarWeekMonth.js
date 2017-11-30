import React from 'react';

import DayMonth from './CalendarDayMonth';
import moment from 'moment';

const filterEvents= (day, events) => {
  return events.filter(event => day.isSame(event.startTime, 'day'))
}

export default ({ events, date, week }) => {
  const days = [
    moment(week).weekday(0),
    moment(week).weekday(1),
    moment(week).weekday(2),
    moment(week).weekday(3),
    moment(week).weekday(4),
    moment(week).weekday(5),
    moment(week).weekday(6)
  ]

  return (
    <div className="WeekMonth">
      {days.map((day, i) => (
        <DayMonth key={i} day={day} date={date} events={filterEvents(day, events)} />
      ))}
      <style jsx>{`
        .WeekMonth {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: stretch;
        }
      `}</style>
    </div>
  )
}
