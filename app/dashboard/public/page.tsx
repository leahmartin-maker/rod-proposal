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
  { title: 'Super Bowl Party', start: new Date(2026, 1, 8, 18, 0), end: new Date(2026, 1, 8, 23, 30), details: '200+ guests expected, full bar & kitchen' },
  { title: 'Mardi Gras Parade Celebration', start: new Date(2026, 2, 1, 15, 0), end: new Date(2026, 2, 1, 22, 0), details: 'Live DJ, costume contest, themed specials' },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-red-900 to-red-700">
      <div className="flex justify-center gap-2 mt-4 mb-4">
        <a href="/dashboard" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Owner</a>
        <a href="/dashboard/manager" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Manager</a>
        <a href="/dashboard/staff" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Staff</a>
        <a href="/dashboard/public" className="px-4 py-2 rounded-full font-semibold transition bg-red-700 text-white">Public</a>
      </div>

      <header className="flex items-center justify-between px-4 pt-2 pb-2 sticky top-0 z-10 bg-black/80 backdrop-blur shadow-md">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-black shadow">HK</span>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">HardKnocks</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-4 px-2 pb-24 pt-2 w-full max-w-md mx-auto text-white">
        {/* Specials */}
        <HKCard title="Today's Specials">
          <ul className="space-y-2">
            {specials.map((s, i) => (
              <li key={i} className="text-sm text-zinc-300 font-semibold">{s.name}</li>
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

        {/* Announcements */}
        <HKCard title="Announcements">
          <ul className="space-y-2">
            {announcements.map((a, i) => (
              <li key={i} className="text-sm text-zinc-300">{a.text}</li>
            ))}
          </ul>
        </HKCard>

        {/* Contact Info */}
        <HKCard title="Contact & Location">
          <div className="space-y-2 text-sm text-zinc-300">
            <div>
              <p className="text-zinc-400 text-xs">Address</p>
              <p className="font-semibold">123 Padre Island Dr, Corpus Christi, TX</p>
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Phone</p>
              <p className="font-semibold">(361) 555-1234</p>
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Email</p>
              <p className="font-semibold">info@hardknocks.com</p>
            </div>
          </div>
        </HKCard>
      </main>
    </div>
  );
}
