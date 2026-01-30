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
  { title: 'Beach Wedding', start: new Date(2026, 0, 29, 17, 0), end: new Date(2026, 0, 29, 22, 0), details: '100 guests, Outdoor Bar' },
];

export default function PublicDashboard() {
  // Placeholder data for demonstration
  const specials = [
    { name: "Wing Wednesday" },
    { name: "Fish Fry Friday" },
  ];
  const events = [
    { title: "Bingo Night", date: "2026-01-28", time: "7:00 PM" },
    { title: "Beach Wedding", date: "2026-01-29", time: "5:00 PM" },
  ];
  const announcements = [
    { text: "Private event Friday!" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 font-sans">
      <div className="text-xl font-bold mb-4">Public Dashboard</div>
      {/* Specials */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="text-sm text-zinc-500 mb-2">Specials</div>
        <ul>
          {specials.map((s, i) => (
            <li key={i} className="text-xs text-zinc-400 py-1">{s.name}</li>
          ))}
        </ul>
      </div>
      {/* Events Calendar */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Events Calendar</span>
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
        <div className="text-sm text-zinc-500 mb-2">Announcements</div>
        <ul>
          {announcements.map((a, i) => (
            <li key={i} className="text-xs text-zinc-400 py-1">{a.text}</li>
          ))}
        </ul>
      </div>
      {/* Contact Info */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="text-sm text-zinc-500 mb-2">Contact & Location</div>
        <div className="text-xs text-zinc-400">123 Padre Island Dr, Corpus Christi, TX</div>
        <div className="text-xs text-zinc-400">(361) 555-1234</div>
        <div className="text-xs text-zinc-400">info@hardknocks.com</div>
      </div>
    </div>
  );
}
