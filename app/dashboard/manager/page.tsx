"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

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
    title: 'Super Bowl Party',
    start: new Date(2026, 1, 8, 18, 0),
    end: new Date(2026, 1, 8, 23, 30),
    details: '200+ guests expected, full bar & kitchen',
    paid: null,
    owed: null,
  },
  {
    title: 'Mardi Gras Parade Celebration',
    start: new Date(2026, 2, 1, 15, 0),
    end: new Date(2026, 2, 1, 22, 0),
    details: 'Live DJ, costume contest, themed specials',
    paid: null,
    owed: null,
  },
];

export default function ManagerDashboard() {
  const [messageText, setMessageText] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [showMessageUI, setShowMessageUI] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>(["🅿️ Park on Palmira for private event (guest parking only)"]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);

  // Staff groups and individual staff
  const staffGroups = {
    "Managers": ["Rod", "Manager 1"],
    "Bar": ["Bartender 1", "Bartender 2"],
    "Barbacks": ["Barback 1", "Barback 2"],
    "Kitchen": ["Chef", "Prep Cook"],
  };
  const allStaff = ["Devonn", "Jedi", "Roxanne", "Sarah", "Marcus", "James", "Tasha"];

  // Placeholder data
  const special = { name: "Wing Wednesday", sales: 120 };

  const handleSendMessage = () => {
    if (selectedRecipients.length === 0 || !messageText.trim()) {
      alert('Please select staff and write a message.');
      return;
    }
    alert(`Message sent to ${selectedRecipients.length} person/people: ${selectedRecipients.join(", ")}\n\nMessage: "${messageText}"`);
    setMessageText("");
    setSelectedRecipients([]);
    setShowMessageUI(false);
  };

  const toggleRecipient = (name: string) => {
    setSelectedRecipients(prev =>
      prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name]
    );
  };

  const toggleGroup = (groupName: string) => {
    const groupStaff = staffGroups[groupName as keyof typeof staffGroups];
    const allSelected = groupStaff.every(person => selectedRecipients.includes(person));
    
    if (allSelected) {
      setSelectedRecipients(prev => prev.filter(r => !groupStaff.includes(r)));
    } else {
      setSelectedRecipients(prev => [
        ...prev,
        ...groupStaff.filter(person => !prev.includes(person))
      ]);
    }
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim()) {
      setAnnouncements([...announcements, newAnnouncement.trim()]);
      setNewAnnouncement("");
      setShowAddAnnouncement(false);
    }
  };

  const handleRemoveAnnouncement = (index: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const handleShareSpecial = async () => {
    const shareText = `🍗 ${special.name} at HardKnocks!\n\n8 boneless or traditional wings with fries, dipping sauce, carrots, and celery for $12.99\n\nCome join us!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: special.name,
          text: shareText,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Special copied to clipboard! Paste it anywhere you like.');
      }).catch(() => {
        alert('Share failed. Please try again.');
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-red-900 to-red-700">
      {/* Top Tab Switcher */}
      <div className="flex justify-center gap-2 mt-4 mb-4">
        <a href="/dashboard" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Owner</a>
        <a href="/dashboard/manager" className="px-4 py-2 rounded-full font-semibold transition bg-red-700 text-white">Manager</a>
        <a href="/dashboard/staff" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Staff</a>
        <a href="/dashboard/public" className="px-4 py-2 rounded-full font-semibold transition bg-zinc-200 text-black hover:bg-zinc-300">Public</a>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-2 pb-2 sticky top-0 z-10 bg-black/80 backdrop-blur shadow-md">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-black shadow">HK</span>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Manager Dashboard</span>
        </div>
        <button className="text-zinc-300 text-2xl">⚙️</button>
      </header>

      <main className="flex-1 flex flex-col gap-4 px-2 pb-24 pt-2 w-full max-w-md mx-auto text-white">
        {/* Specials Card */}
        <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-red-400 font-bold uppercase">Specials</span>
            <div className="flex gap-2">
              <button className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Edit/Approve</button>
              <button onClick={handleShareSpecial} className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">Share</button>
            </div>
          </div>
          <div className="text-base font-semibold">{special.name}</div>
          <div className="text-sm text-zinc-300 mt-1">
            8 boneless or traditional wings with fries, dipping sauce, carrots, and celery for $12.99
          </div>
        </div>

        {/* Latest Facebook Post Card */}
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

        {/* Announcements Card */}
        <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-red-400 font-bold uppercase">📢 Announcements</span>
            <button 
              onClick={() => setShowAddAnnouncement(!showAddAnnouncement)}
              className="text-lg font-bold bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {announcements.length === 0 ? (
            <div className="text-sm text-zinc-400">No active announcements</div>
          ) : (
            <div className="space-y-2">
              {announcements.map((announcement, index) => (
                <div key={index} className="bg-red-900/30 border border-red-700 rounded p-2 flex justify-between items-start gap-2">
                  <div className="text-sm text-white flex-1">{announcement}</div>
                  <button
                    onClick={() => handleRemoveAnnouncement(index)}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold shrink-0 whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddAnnouncement && (
            <div className="mt-3 space-y-2 pt-3 border-t border-zinc-600">
              <textarea
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Add announcement (parking, schedule changes, reminders, etc.)"
                className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-700 h-16 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddAnnouncement}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white rounded py-1 font-semibold text-sm"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddAnnouncement(false);
                    setNewAnnouncement("");
                  }}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded py-1 font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="text-xs text-zinc-500 mt-2 border-t border-zinc-700 pt-2">
            Announcements persist until manually removed. Staff sees them immediately when logging in.
          </div>
        </div>

        {/* Send Message Card */}
        <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
          {!showMessageUI ? (
            <button 
              onClick={() => setShowMessageUI(true)}
              className="w-full bg-red-700 hover:bg-red-800 text-white rounded-lg py-2 font-bold text-lg"
            >
              💬 Send Message to Staff
            </button>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="text-sm text-red-400 font-bold uppercase mb-2">Select Staff</div>
                
                {/* Groups */}
                <div className="space-y-2 mb-3">
                  {Object.keys(staffGroups).map(groupName => {
                    const groupStaff = staffGroups[groupName as keyof typeof staffGroups];
                    const allSelected = groupStaff.every(person => selectedRecipients.includes(person));
                    return (
                      <label key={groupName} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={() => toggleGroup(groupName)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-semibold text-yellow-400">{groupName}</span>
                      </label>
                    );
                  })}
                </div>
                
                {/* Divider */}
                <div className="border-t border-zinc-600 my-2"></div>
                
                {/* Individual Staff */}
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {allStaff.map(name => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(name)}
                        onChange={() => toggleRecipient(name)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-zinc-300">{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <div className="text-xs text-zinc-400 mb-1">Selected: {selectedRecipients.length} person/people</div>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-700 h-20 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white rounded py-2 font-semibold text-sm"
                >
                  Send
                </button>
                <button
                  onClick={() => {
                    setShowMessageUI(false);
                    setMessageText("");
                    setSelectedRecipients([]);
                  }}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded py-2 font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Events Calendar Card */}
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
          <div className="text-xs text-zinc-400">Click an event to see details.</div>
        </div>

        {/* Dashboard Links */}
        <div className="mt-2 text-center text-xs text-zinc-400">
          <a href="/dashboard" className="underline">View Owner Dashboard</a>
          <span className="mx-2">|</span>
          <a href="/dashboard/staff" className="underline">View Staff Dashboard</a>
        </div>
      </main>
    </div>
  );
}
