import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////
import { getAllStudentsProcesses } from "../requests";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = inject(
  "adminstore",
  "studentstore"
)(
  observer((props) => {
    const [myEvents, setMyEvents] = useState([]);
    useEffect(() => {
      getAllEvents();
    }, []);
    const getAllEvents = async () => {
      let events = await getAllStudentsProcesses();
      let myEventss = events.map((p) => {
        if (p.status === "Open" || p.status === "Pending")
          return {
            title: p.studentName + " | " + p.companyName + " | " + p.role,
            start: new Date(p.mostRecentInterview),
            end: new Date(p.mostRecentInterview),
          };
      });
      setMyEvents([...myEventss]);
    };
    return (
      <div className="App">
        <h1>Calendar</h1>

        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "5px" }}
        />
      </div>
    );
  })
);
export default MyCalendar;
