import { GlobalState, Action } from 'context/GlobalReducer';

export type CalendarEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  duration: number;
  location: string;
};

export type Calendar = {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  events: CalendarEvent[];
};

export type NewCalendarPayload = {
  id: string;
  title: string;
  settings?: {
    color: string;
  };
  events: CalendarEvent[];
};

export type EditCalendarPayload = {
  title?: string;
  settings?: {
    color: string;
  };
  events?: CalendarEvent[];
};

export const addCalendar = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_CALENDAR') {
    return state;
  }

  const ID_HACK = Math.floor(Math.random() * 10000).toString(); // TODO Get the correct UUID from server
  const newCalendar = {
    id: ID_HACK,
    settings: { color: '--color-primary' },
    events: [],
    ...action.payload.calendar,
  };
  const newCalendars = [...state.calendars, newCalendar];
  console.log('Dispatch ADD_CALENDAR');
  return { ...state, calendars: newCalendars };
};

export const editCalendar = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_CALENDAR') {
    return state;
  }
  const newCalendar = {
    ...state.calendars.filter(
      (calendar) => calendar.id === action.payload.calendarId
    )[0],
    ...action.payload.updates,
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch EDIT_CALENDAR');
  return { ...state, calendars: newCalendars };
};

export const deleteCalendar = (state: GlobalState, action: Action) => {
  if (action.type !== 'DELETE_CALENDAR') {
    return state;
  }
  const newCalendars = state.calendars.filter(
    (calendar) => calendar.id !== action.payload.calendarId
  );
  console.log('Dispatch DELETE_CALENDAR');
  return { ...state, calendars: newCalendars };
};
