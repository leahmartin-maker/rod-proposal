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

export default function ManagerDashboard() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-red-900 to-red-700">
      <div className="flex justify-center gap-2 mt-4 mb-4">
        <a href="/dashboard" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Owner</a>
        <a href="/dashboard/manager" className="px-4 py-2 rounded-full font-semibold transition bg-red-700 text-white">Manager</a>
        <a href="/dashboard/staff" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Staff</a>
        <a href="/dashboard/public" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Public</a>
      </div>

      <header className="flex items-center justify-between px-4 pt-2 pb-2 sticky top-0 z-10 bg-black/80 backdrop-blur shadow-md">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-black shadow">HK</span>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Manager Dashboard</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-4 px-2 pb-24 pt-2 w-full max-w-md mx-auto text-white">
        {/* Specials Management */}
        <HKCard
          title="Specials"
          action={<button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Add Special</button>}
        >
          <ul className="space-y-2">
            {specials.map(s => (
              <li key={s.name} className="flex justify-between text-sm">
                <span>{s.name}</span>
                <span className="text-xs text-red-300">{s.status}</span>
              </li>
            ))}
          </ul>
        </HKCard>

        {/* Schedule Management */}
        <HKCard
          title="Schedule"
          action={<button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Edit</button>}
        >
          <ul className="space-y-2">
            {schedule.map(s => (
              <li key={s.name} className="flex justify-between text-sm">
                <span>{s.name} <span className="text-xs text-zinc-400">({s.role})</span></span>
                <span className="text-xs text-zinc-400">{s.shift}</span>
              </li>
            ))}
          </ul>
        </HKCard>

        {/* Events Calendar */}
        <HKCard title="Events Calendar" action={<button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Add Event</button>}>
          <div style={{ height: 300 }} className="mb-2 rounded-lg overflow-hidden bg-white">
            <Calendar
              localizer={localizer}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              views={['month', 'week', 'day']}
              defaultView="month"
              popup
              onSelectEvent={(event: any) => {
                let details = `Event: ${event.title}\nTime: ${format(event.start, 'p')} - ${format(event.end, 'p')}\nDetails: ${event.details}`;
                alert(details);
              }}
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </div>
          <div className="text-xs text-zinc-400">Click an event to see details.</div>
        </HKCard>

        {/* Announcements */}
        <HKCard title="Announcements" action={<button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Add</button>}>
          <div className="text-sm text-zinc-300">No announcements for today.</div>
        </HKCard>

        {/* Staff Comments */}
        <HKCard title="Staff Comments">
          <div className="text-sm text-zinc-300">No comments yet.</div>
        </HKCard>
      </main>
    </div>
  );
}
