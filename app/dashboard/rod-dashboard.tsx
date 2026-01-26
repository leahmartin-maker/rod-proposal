

"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// react-big-calendar setup
const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventList = [
  {
    title: 'Private Party',
    start: new Date(2026, 0, 27, 18, 0),
    end: new Date(2026, 0, 27, 21, 0),
    details: '50 guests, Room A',
    paid: 800,
    owed: 0,
  },
  {
    title: 'Bingo Night',
    start: new Date(2026, 0, 28, 19, 0),
    end: new Date(2026, 0, 28, 22, 0),
    details: 'Weekly bingo event',
    paid: null,
    owed: null,
  },
  {
    title: 'Beach Wedding',
    start: new Date(2026, 0, 29, 17, 0),
    end: new Date(2026, 0, 29, 22, 0),
    details: '100 guests, Outdoor Bar',
    paid: 1200,
    owed: 200,
  },
];

export default function RodDashboard() {
  const [restaurant, setRestaurant] = useState("Hardknocks");

  // Placeholder data for demonstration
  const sales = restaurant === "Hardknocks" ? 2450.75 : 1875.50;
  const special = restaurant === "Hardknocks"
    ? { name: "Wing Wednesday", sales: 120 }
    : { name: "Fish Fry Friday", sales: 80 };
  const currentEvent = restaurant === "Hardknocks"
    ? { name: "Private Party", isToday: true, amountPaid: 800 }
    : { name: "Beach Wedding", isToday: false, amountPaid: 1200 };
  const staffClockedIn = restaurant === "Hardknocks"
    ? ["Devonn", "Jedi", "Roxanne"]
    : ["Sam", "Taylor"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 font-sans">
      {/* Top Tabs */}

      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${restaurant === "Hardknocks" ? "bg-blue-600 text-white" : "bg-zinc-200"}`}
          onClick={() => setRestaurant("Hardknocks")}
        >
          Hardknocks
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${restaurant === "Anchor" ? "bg-blue-600 text-white" : "bg-zinc-200"}`}
          onClick={() => setRestaurant("Anchor")}
        >
          Anchor
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{restaurant}</span>
        </div>
        <button className="text-zinc-500">⚙️</button>
      </div>


      {/* Overview Panel */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="text-sm text-zinc-500 mb-2">Overview</div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Sales Today</span>
            <span className="font-semibold">${sales.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Special: {special.name}</span>
            <span className="font-semibold">{special.sales} sold</span>
          </div>
          {currentEvent.isToday && (
            <div className="flex justify-between text-blue-600">
              <span>Event: {currentEvent.name}</span>
              <span className="font-semibold">Paid: ${currentEvent.amountPaid}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quicklink Buttons */}
      <div className="flex justify-between gap-2 mb-4">
        <a href="#" className="flex-1 bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-zinc-200 rounded-lg py-2 text-center font-semibold shadow">Socials</a>
        <a href="#" className="flex-1 bg-green-100 dark:bg-zinc-800 text-green-700 dark:text-zinc-200 rounded-lg py-2 text-center font-semibold shadow">Sports</a>
        <a href="#" className="flex-1 bg-yellow-100 dark:bg-zinc-800 text-yellow-700 dark:text-zinc-200 rounded-lg py-2 text-center font-semibold shadow">Email</a>
      </div>


      {/* Specials Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Specials</span>
          <button className="text-blue-600 text-xs">Edit/Approve</button>
        </div>
        <div className="text-base font-semibold">{special.name}</div>
        <div className="text-xs text-zinc-400">Archive | Auto-post</div>
      </div>

      {/* Announcements Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Announcements</span>
          <button className="text-blue-600 text-lg font-bold">+</button>
        </div>
        <div className="text-base text-zinc-700 dark:text-zinc-200">No announcements for today.</div>
        <div className="text-xs text-zinc-400 mt-1">(Managers/Rod can add a daily announcement. Only visible for the current business day.)</div>
      </div>

      {/* Who's Working Button */}
      <div className="mb-4">
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold">View Clocked-In Staff</button>
        {/* Example popup (replace with modal logic as needed) */}
        {/* <div className="mt-2 bg-white dark:bg-zinc-900 rounded shadow p-2">
          {staffClockedIn.map(name => <div key={name}>{name}</div>)}
        </div> */}
      </div>


      {/* Messages Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Messages</span>
          <button className="text-blue-600 text-xs">Send</button>
        </div>
        {/* Search bar for recipients */}
        <input
          type="text"
          placeholder="Search employees or groups..."
          className="w-full mb-2 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-sm"
        />
        {/* Dropdown for search results and multi-select (placeholder) */}
        <div className="mb-2 text-xs text-zinc-400">Dropdown with selectable employees/groups will appear as you type. You can select multiple recipients.</div>
        {/* Message thread placeholder */}
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded p-2 h-24 mb-2 text-xs text-zinc-500 flex items-center justify-center">
          Message thread will appear here.
        </div>
        {/* Message input */}
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
        />
      </div>



      {/* Events Calendar Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-500">Events Calendar</span>
          <button className="text-blue-600 text-xs">Add Event</button>
        </div>
        <div style={{ height: 400 }} className="mb-2">
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
              if (event.paid !== null) {
                details += `\nPaid: $${event.paid}`;
                if (event.owed && event.owed > 0) details += `\nOwed: $${event.owed}`;
              }
              alert(details);
            }}
            style={{ backgroundColor: 'white' }}
          />
        </div>
        <div className="text-xs text-zinc-400">Click an event to see details. (Rod sees payment info; others do not.)</div>
      </div>

      {/* Quick Action FAB */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 text-3xl shadow-lg">+</button>

      {/* Public Dashboard Links */}
      <div className="mt-8 text-center text-xs text-zinc-400">
        <a href="/dashboard/anchor" className="underline">View Anchor Public Dashboard</a>
        <span className="mx-2">|</span>
        <a href="/dashboard/hardknocks" className="underline">View Hardknocks Public Dashboard</a>
      </div>
    </div>
  );
}
