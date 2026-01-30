"use client";
import React from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// react-big-calendar setup
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const eventList = [
  { title: 'Bingo Night', start: new Date(2026, 0, 28, 19, 0), end: new Date(2026, 0, 28, 22, 0), details: 'Weekly bingo event' },
  { title: 'Private Party', start: new Date(2026, 0, 27, 18, 0), end: new Date(2026, 0, 27, 21, 0), details: '50 guests, Room A' },
];

export default function ManagerDashboard() {
  // Placeholder data for demonstration
  const specials = [
    { name: "Wing Wednesday", status: "auto-posted" },
    { name: "Fish Fry Friday", status: "pending approval" },
  ];
  const schedule = [
    { name: "Devonn", role: "Bar", shift: "4pm-12am" },
    { name: "Jedi", role: "Kitchen", shift: "2pm-10pm" },
  ];
  const events = [
    { title: "Bingo Night", date: "2026-01-28", time: "7:00 PM" },
    { title: "Private Party", date: "2026-01-27", time: "6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 font-sans">
      <div className="text-xl font-bold mb-4">Manager Dashboard</div>
      {/* Specials Management */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Specials</span>
          <button className="text-blue-600 text-xs">Add Special</button>
        </div>
        <ul>
          {specials.map(s => (
            <li key={s.name} className="flex justify-between py-1">
              <span>{s.name}</span>
              <span className="text-xs text-zinc-400">{s.status}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Schedule Management */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Schedule</span>
          <button className="text-blue-600 text-xs">Edit</button>
        </div>
        <ul>
          {schedule.map(s => (
            <li key={s.name} className="flex justify-between py-1">
              <span>{s.name} ({s.role})</span>
              <span className="text-xs text-zinc-400">{s.shift}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Events Calendar */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Events Calendar</span>
          <button className="text-blue-600 text-xs">Add Event</button>
        </div>
        <div style={{ height: 300 }} className="mb-2">
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day']}
            defaultView="month"
            popup
            onSelectEvent={event => {
              let details = `Event: ${event.title}\nTime: ${format(event.start, 'p')} - ${format(event.end, 'p')}\nDetails: ${event.details}`;
              alert(details);
            }}
            style={{ backgroundColor: 'white' }}
          />
        </div>
        <div className="text-xs text-zinc-400">Click an event to see details.</div>
      </div>
      {/* Announcements */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Announcements</span>
          <button className="text-blue-600 text-xs">Add</button>
        </div>
        <div className="text-xs text-zinc-400">No announcements for today.</div>
      </div>
      {/* Staff Comments */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Staff Comments</span>
        </div>
        <div className="text-xs text-zinc-400">No comments yet.</div>
      </div>
    </div>
  );
}
