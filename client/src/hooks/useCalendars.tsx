import { useState, useEffect, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';

export type CalendarFields = {
  id: string;
  title: string;
  settings: {
    color: string;
  };
};

function useCalendarEvents() {
  const { data } = useContext(GlobalContext);
  const [calendars, setCalendars] = useState<CalendarFields[]>([]);

  useEffect(() => {
    setCalendars(
      data.calendars.map((calendar) => ({
        id: calendar.id,
        title: calendar.title,
        settings: {
          color: calendar.settings.color,
        },
      }))
    );
  }, [data, data.calendars]);

  return calendars;
}

export default useCalendarEvents;
