const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const server = require('../server');

const db = firebase.database();

const EVENTS = (
  eventId,
  name,
  date,
  color,
  duration,
  location,
  description
) => {
  return {
    id: eventId,
    name: name,
    date: date,
    settings: {
      color: color,
    },
    duration: duration,
    location: location,
    description: description,
  };
};

//CREATE an event inside calendar
router.post('/', server, (req, res) => {
  const {
    uid,
    calendarId = '',
    name = '',
    date = '',
    color = '',
    duration = '',
    location = '',
    description = '',
  } = req.body;

  const eventId = db
    .ref('users/' + uid + '/calendars/' + calendarId + '/events')
    .push().key;

  db.ref('users/' + uid + '/calendars/' + calendarId + '/events/' + eventId)
    .set(EVENTS(eventId, name, date, color, duration, location, description))
    .then(() => {
      res.json({ eventId: eventId });
    })
    .catch((err) => res.json({ error: err.message }));
});

//READ all Events in a calandar
router.get('/:uid/:calendarId', (req, res) => {
  const { uid, calendarId } = req.params;
  db.ref('users/' + uid + '/calendars/' + calendarId + '/events/')
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object.values(data.val());
        res.json(val);
      } else {
        res.json({ err: 'DOESNT EXIST' });
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

//READ an event from calendar
router.get('/:uid/:calendarId/:eventId', (req, res) => {
  const { uid, calendarId, eventId } = req.params;
  db.ref('users/' + uid + '/calendars/' + calendarId + '/events/' + eventId)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        res.json(Object(data.val()));
      } else {
        res.json({ err: 'DOESNT EXIST' });
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

//UPDATE an event inside calendar
router.patch('/:uid/:calendarId/:eventId', server, (req, res) => {
  const { calendarId, eventId, uid } = req.params;
  const { name, date, duration, location, description } = req.body;

  db.ref('users/' + uid + '/calendars/' + calendarId + '/events/' + eventId)
    .update({
      name: name,
      date: date,
      duration: duration,
      location: location,
      description: description,
    })
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated event' })
    )
    .catch((err) => res.json({ error: err.message }));
});

router.delete('/:uid/:calendarId/:eventId', server, (req, res) => {
  const { uid, calendarId, eventId } = req.params;
  db.ref('users/' + uid + '/calendars/' + calendarId + '/events/' + eventId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted event' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
