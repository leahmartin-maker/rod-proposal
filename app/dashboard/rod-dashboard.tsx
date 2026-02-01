

"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
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


  // Theme logic
  // Only apply redesign for HardKnocks
  const isHardKnocks = restaurant === "Hardknocks";
  const fontClass = "font-['Geist',_Inter,_Arial,_sans-serif]";

  return (
    <div className={`min-h-screen flex flex-col ${isHardKnocks ? 'bg-gradient-to-b from-black via-red-900 to-red-700' : 'bg-zinc-50 dark:bg-black'} ${fontClass}`}>
      {/* Top Tab Switcher (always at the top) */}
      <div className="flex justify-center gap-2 mt-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${restaurant === "Hardknocks" ? 'bg-red-700 text-white' : 'bg-zinc-200 text-black'}`}
          onClick={() => setRestaurant("Hardknocks")}
        >
          HardKnocks
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${restaurant === "Anchor" ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-black'}`}
          onClick={() => setRestaurant("Anchor")}
        >
          Anchor
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${restaurant === "Fajitaville" ? 'bg-yellow-400 text-black' : 'bg-zinc-200 text-black'}`}
          onClick={() => setRestaurant("Fajitaville")}
        >
          Fajitaville
        </button>
      </div>

      {/* Branded Header */}
      {isHardKnocks && (
        <header className="flex items-center justify-between px-4 pt-2 pb-2 sticky top-0 z-10 bg-black/80 backdrop-blur shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-black shadow">HK</span>
            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">HardKnocks</span>
          </div>
          <button className="text-zinc-300 text-2xl">⚙️</button>
        </header>
      )}

      {/* Main Content (only new cards, no fallback UI) */}
      <main className="flex-1 flex flex-col gap-4 px-2 pb-24 pt-2 w-full max-w-md mx-auto">
        {/* Overview Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="uppercase text-xs tracking-widest text-red-400 font-bold">Today</span>
              <span className="text-xs text-zinc-400">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Sales</span>
              <span className="text-2xl font-extrabold text-red-400">${sales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Special</span>
              <span className="text-base font-bold text-white">{special.name} <span className="text-xs text-zinc-400">({special.sales} sold)</span></span>
            </div>
            {currentEvent.isToday && (
              <div className="flex justify-between items-center mt-2 bg-red-900/60 rounded-lg px-2 py-1">
                <span className="text-sm font-bold text-red-300">Event: {currentEvent.name}</span>
                <span className="text-sm font-semibold text-white">Paid: ${currentEvent.amountPaid}</span>
              </div>
            )}
          </div>
        )}

        {/* Quicklinks */}
        {isHardKnocks && (
          <div className="flex gap-2 w-full">
            <a href="#" className="flex-1 rounded-xl py-3 text-center font-bold bg-gradient-to-br from-red-700 to-black text-white shadow hover:scale-105 transition">Socials</a>
            <a href="#" className="flex-1 rounded-xl py-3 text-center font-bold bg-gradient-to-br from-black to-red-700 text-white shadow hover:scale-105 transition">Sports</a>
            <a href="#" className="flex-1 rounded-xl py-3 text-center font-bold bg-gradient-to-br from-red-700 to-black text-white shadow hover:scale-105 transition">Email</a>
          </div>
        )}

        {/* Specials Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-red-400 font-bold uppercase">Specials</span>
              <button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Edit/Approve</button>
            </div>
            <div className="text-base font-semibold">{special.name}</div>
          </div>
        )}

        {/* Latest Facebook Post Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-red-400 font-bold uppercase">Latest Facebook Post</span>
              <a href="#" className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Share</a>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-zinc-300 leading-relaxed">
                🏈 Game Day Special! 🏈 Join us at HardKnocks for all the action this weekend. We've got ice cold drinks, wings, and the best view of the game in town. Don't miss it!
              </div>
              <div className="text-xs text-zinc-500 border-t border-zinc-700 pt-2">
                <p>Posted 2 hours ago</p>
                <div className="flex gap-3 mt-1">
                  <span>❤️ 47 likes</span>
                  <span>💬 12 comments</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-red-400 font-bold uppercase">Announcements</span>
              <button className="text-lg font-bold bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center">+</button>
            </div>
            <div className="text-base text-zinc-200">No announcements for today.</div>
            <div className="text-xs text-zinc-400 mt-1">(Managers/Rod can add a daily announcement. Only visible for the current business day.)</div>
          </div>
        )}

        {/* Who's Working Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
            <button className="w-full bg-red-700 hover:bg-red-800 text-white rounded-lg py-2 font-bold text-lg flex items-center justify-center gap-2">
              <span className="material-icons">groups</span> View Clocked-In Staff
            </button>
          </div>
        )}

        {/* Events Calendar Card */}
        {isHardKnocks && (
          <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-red-400 font-bold uppercase">Events Calendar</span>
              <button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Add Event</button>
            </div>
            <div style={{ height: 320 }} className="mb-2 rounded-lg overflow-hidden bg-white">
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
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="text-xs text-zinc-400">Click an event to see details. (Rod sees payment info; others do not.)</div>
          </div>
        )}

        {/* Public Dashboard Links */}
        {isHardKnocks && (
          <div className="mt-2 text-center text-xs text-zinc-400">
            <a href="/dashboard/anchor" className="underline">View Anchor Public Dashboard</a>
            <span className="mx-2">|</span>
            <a href="/dashboard/hardknocks" className="underline">View Hardknocks Public Dashboard</a>
          </div>
        )}

        {/* Floating Action Button */}
        {isHardKnocks && (
          <button className="fixed bottom-20 right-6 bg-red-700 hover:bg-red-800 text-white rounded-full w-16 h-16 text-4xl shadow-lg flex items-center justify-center z-50 transition-all">+</button>
        )}
      </main>
    </div>
  );
}
