import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";

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

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 1, 2),
    end: new Date(2022, 1, 2),
  },
  {
    title: "Vacation",
    allDay: true,
    start: new Date(2022, 1, 2),
    end: new Date(2022, 1, 2),
  },
  {
    title: "Conference",
    allDay: true,
    start: new Date(2022, 1, 2),
    end: new Date(2022, 1, 2),
  },
  {
    title: "Conference",
    allDay: true,
    start: new Date(2022, 1, 2),
    end: new Date(2022, 1, 2),
  },
  {
    title: "Conference",
    allDay: true,
    start: new Date(2022, 1, 2),
    end: new Date(2022, 1, 2),
  },
];

export default function MyCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App">
      <h1>Calendar</h1>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "5px" }}
      />
    </div>
  );
}
