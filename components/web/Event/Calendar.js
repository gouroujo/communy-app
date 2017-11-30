import { Button } from 'semantic-ui-react'
import CalendarMonth from './CalendarMonth';

export default ({ events = [], date, handlePrevious, handleToday, handleNext, children }) => (
  <div className="Calendar">
    <div className="header">
      <span className="month">{date.format('MMMM')}</span>
      <span className="year">{date.format('YYYY')}</span>
      <div className="buttons">
        {children}
        <Button.Group>
          <Button icon="chevron left" onClick={handlePrevious}/>
          <Button onClick={handleToday}>Aujourd'hui</Button>
          <Button icon="chevron right" onClick={handleNext}/>
        </Button.Group>
      </div>
    </div>
    <CalendarMonth date={date} events={events}/>
    <style jsx>{`
      .ui.segment > .Calendar {
        margin: -1em;
      }
      .Calendar > .header {
        padding: 10px 10px 5px 20px;
      }
      .Calendar > .header .month {
        font-size: 2em;
        font-weight: 100;
      }
      .Calendar > .header .year {
        font-size: 1.2em;
      }
      .buttons {
        float: right;
      }
    `}</style>
  </div>
)
