"use client";
import React from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import { HKCard } from '@/app/components/HardKnocksComponents';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-red-900 to-red-700">
      <div className="flex justify-center gap-2 mt-4 mb-4">
        <a href="/dashboard" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Owner</a>
        <a href="/dashboard/manager" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Manager</a>
        <a href="/dashboard/staff" className="px-4 py-2 rounded-full font-semibold transition bg-red-700 text-white">Staff</a>
        <a href="/dashboard/public" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Public</a>
      </div>

      <header className="flex items-center justify-between px-4 pt-2 pb-2 sticky top-0 z-10 bg-black/80 backdrop-blur shadow-md">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-black shadow">HK</span>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Staff Dashboard</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-4 px-2 pb-24 pt-2 w-full max-w-md mx-auto text-white">
        {/* My Schedule */}
        <HKCard title="My Schedule">
          <ul className="space-y-2">
            {mySchedule.map(s => (
              <li key={s.day} className="flex justify-between text-sm">
                <span>{s.day}</span>
                <span className="text-xs text-zinc-400">{s.shift}</span>
              </li>
            ))}
          </ul>
        </HKCard>

        {/* Announcements */}
        <HKCard title="Announcements">
          <ul className="space-y-2">
            {announcements.map((a, i) => (
              <li key={i} className="text-sm text-zinc-300">{a.text}</li>
            ))}
          </ul>
        </HKCard>

        {/* Specials */}
        <HKCard title="Specials">
          <ul className="space-y-2">
            {specials.map((s, i) => (
              <li key={i} className="text-sm text-zinc-300">{s.name}</li>
            ))}
          </ul>
        </HKCard>

        {/* Events Calendar */}
        <HKCard title="Events Calendar">
          <div style={{ height: 300 }} className="mb-2 rounded-lg overflow-hidden bg-white">
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
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </div>
          <div className="text-xs text-zinc-400">Click an event to see details.</div>
        </HKCard>

        {/* Latest Facebook Post */}
        <HKCard title="Latest Facebook Post" action={<a href="#" className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Share</a>}>
          <div className="space-y-3">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Special" className="rounded-lg w-full" />
            <div>
              <div className="text-base font-semibold mb-1">Tuesday Taco Fiesta!</div>
              <div className="text-sm text-zinc-300 mb-2">Tacos, margaritas, and more! Join us tonight for our famous Taco Tuesday. 🌮🍹 #TacoTuesday #PadreIsland</div>
              <div className="flex gap-2 flex-wrap">
                <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-semibold">Copy Caption</button>
                <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-semibold">Download Image</button>
              </div>
            </div>
          </div>
        </HKCard>

        {/* Staff Comments */}
        <HKCard title="Staff Comments">
          <div className="space-y-3">
            <ul className="space-y-2">
              {comments.map((c, i) => (
                <li key={i} className="text-sm text-zinc-300"><span className="font-semibold">{c.author}:</span> {c.text}</li>
              ))}
            </ul>
            <input type="text" placeholder="Add a comment..." className="w-full px-3 py-2 rounded border border-zinc-600 bg-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-700" />
          </div>
        </HKCard>
      </main>
    </div>
  );
}
