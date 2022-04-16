const express = require('express');
const router = express.Router();

const firebase = require('../config/firebase');
const server = require('../server');

const CALENDAR = (calendarId, title, color) => {
  return {
    id: calendarId,
    title: title,
    settings: {
      color: color,
    },
    events: [],
  };
};

const db = firebase.database();

// CREATE a calendar
router.post('/', server, (req, res) => {
  const { uid, title, color } = req.body;
  const calendarId = db.ref('users/' + uid + '/calendars/').push().key; //getting key
  db.ref('users/' + uid + '/calendars/' + calendarId)
    .set(CALENDAR(calendarId, title, color))
    .then(() => {
      res.json({ id: calendarId });
    })
    .catch((err) => res.json({ error: err.message }));
});

// READ all calendars
router.get('/:uid', (req, res) => {
  const uid = req.params.uid;
  db.ref('users/' + uid + '/calendars')
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object.values(data.val());
        val.forEach((element) => {
          if (element.events != null) {
            element.events = Object.values(element.events);
          }
        });
        res.json(val);
      } else {
        res.json({ err: 'DOESNT EXIST' });
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

// READ one calendar
router.get('/:uid/:calendarId', (req, res) => {
  const { uid, calendarId } = req.params;

  db.ref('users/' + uid + '/calendars/' + calendarId)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object(data.val());
        if (val.events != null) val.events = Object.values(data.val().events);

        res.json(val);
      }
      //basically if the key doesnt exist
      else res.json({ err: 'DOESNT EXIST' });
    })
    .catch((err) => res.json({ error: err.message }));
});

// UPDATE a calendar
router.patch('/:uid/:calendarId', server, (req, res) => {
  const { uid, calendarId } = req.params;
  const { title, color } = req.body;

  db.ref('users/' + uid + '/calendars/' + calendarId)
    .update({
      title: title,
      settings: {
        color: color,
      },
    })
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated calendar' })
    )
    .catch((err) => res.json({ error: err.message }));
});

// DELETE a calendar
router.delete('/:uid/:calendarId', (req, res) => {
  const { uid, calendarId } = req.params;
  db.ref('users/' + uid + '/calendars/' + calendarId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted calendar' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
