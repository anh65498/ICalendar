import { useState, useEffect, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Calendar, CalendarEvent } from 'context/controllers/calendarReducer';

export type CalendarEventItemType = CalendarEvent & {
  color: string;
  calendarId: string;
};

const indexEventsByDate = (calendars: Calendar[]) => {
  const indexedEvents = new Map<string, CalendarEventItemType[]>();
  calendars.forEach((calendar) => {
    calendar?.events?.forEach((event) => {
      const dateKey = new Date(Date.parse(event.date)).toDateString();
      if (indexedEvents.has(dateKey)) {
        indexedEvents.get(dateKey)?.push({
          ...event,
          color: calendar.settings.color,
          calendarId: calendar.id,
        });
      } else {
        indexedEvents.set(dateKey, [
          { ...event, color: calendar.settings.color, calendarId: calendar.id },
        ]);
      }
    });
  });
  return indexedEvents;
};

function useCalendarEvents() {
  const { data } = useContext(GlobalContext);
  const [events, setEvents] = useState<Map<string, CalendarEventItemType[]>>(
    indexEventsByDate(data.calendars || [])
  );

  useEffect(() => {
    setEvents(indexEventsByDate(data.calendars));
  }, [data.calendars]);

  return events;
}

export default useCalendarEvents;
