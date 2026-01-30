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

export default function StaffDashboard() {
  // Placeholder data for demonstration
  const mySchedule = [
    { day: "Monday", shift: "4pm-12am" },
    { day: "Wednesday", shift: "2pm-10pm" },
  ];
  const announcements = [
    { text: "Private event Friday!" },
  ];
  const specials = [
    { name: "Wing Wednesday" },
  ];
  const events = [
    { title: "Bingo Night", date: "2026-01-28", time: "7:00 PM" },
  ];
  const comments = [
    { author: "Devonn", text: "Great shift today!" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 font-sans">
      <div className="text-xl font-bold mb-4">Staff Dashboard</div>
      {/* My Schedule */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="text-sm text-zinc-500 mb-2">My Schedule</div>
        <ul>
          {mySchedule.map(s => (
            <li key={s.day} className="flex justify-between py-1">
              <span>{s.day}</span>
              <span className="text-xs text-zinc-400">{s.shift}</span>
            </li>
          ))}
        </ul>
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

      {/* Latest Facebook Post (Mock) */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Latest Facebook Post</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Special" className="rounded-lg mb-2 w-full max-w-xs" />
          <div className="text-base font-semibold mb-1 text-center">Tuesday Taco Fiesta!</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-300 mb-2 text-center">Tacos, margaritas, and more! Join us tonight for our famous Taco Tuesday. 🌮🍹 #TacoTuesday #PadreIsland</div>
          <div className="flex gap-2 mb-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Copy Caption</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">Download Image</button>
            <button className="bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded text-xs">Share Link</button>
          </div>
          <div className="text-xs text-zinc-400 text-center">Staff can screenshot or use these tools to share on Instagram, TikTok, Snapchat, etc.</div>
        </div>
      </div>

      {/* Staff Comments */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="text-sm text-zinc-500 mb-2">Staff Comments</div>
        <ul>
          {comments.map((c, i) => (
            <li key={i} className="text-xs text-zinc-400 py-1"><b>{c.author}:</b> {c.text}</li>
          ))}
        </ul>
        <input type="text" placeholder="Add a comment..." className="w-full mt-2 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm" />
      </div>
    </div>
  );
}
