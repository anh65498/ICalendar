import { GlobalState, Action } from 'context/GlobalReducer';
import { CalendarEvent } from 'context/controllers/calendarReducer';

export type NewCalendarEventPayload = Partial<Omit<CalendarEvent, 'id'>>;
export type EditCalendarEventPayload = Partial<NewCalendarEventPayload>;

export const addCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_CALENDAR_EVENT') {
    return state;
  }
  const newCalendarEvent = {
    id: action.payload.eventId,
    location: '',
    description: '',
    date: '',
    name: '',
    duration: 1,
    ...action.payload.event,
  };
  const oldCalendar = state.calendars.filter(
    (calendar) => calendar.id === action.payload.calendarId
  )[0];
  const newCalendar = {
    ...oldCalendar,
    events: [...oldCalendar.events, newCalendarEvent],
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch ADD_CALENDAR_EVENT');
  return { ...state, calendars: newCalendars };
};

export const editCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_CALENDAR_EVENT') {
    return state;
  }
  const currentCalendar = {
    ...state.calendars.filter(
      (calendar) => calendar.id === action.payload.calendarId
    )[0],
  };
  const newCalendar = {
    ...currentCalendar,
    events: currentCalendar.events.map((event) =>
      event.id === action.payload.eventId
        ? { ...event, ...action.payload.event }
        : event
    ),
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch EDIT_CALENDAR_EVENT');
  return { ...state, calendars: newCalendars };
};

export const deleteCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'DELETE_CALENDAR_EVENT') {
    return state;
  }
  const currentCalendar = state.calendars.filter(
    (calendar) => calendar.id === action.payload.calendarId
  )[0];

  const newCalendar = {
    ...currentCalendar,
    events: currentCalendar.events.filter(
      (event) => event.id !== action.payload.eventId
    ),
  };
  return {
    ...state,
    calendars: state.calendars.map((calendar) =>
      calendar.id === action.payload.calendarId ? newCalendar : calendar
    ),
  };
};
