const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

// To test this route on POSTMAN, Choose Body -> raw + JSON
// Example: localhost:5000/api/auth/signin
// If sign in successfully, response sends back status 200
// If sign in fail, response sends back status 200, errorCode and errorMessage
router.post('/signin', JSONParser, (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => res.json({ uid: user.uid }))
    .catch((error) => {
      res.json({
        code: error.code,
        message: error.message,
      });
    });
});

// To test this route on POSTMAN, Choose Body -> raw + JSON
// Example: localhost:5000/api/auth/signup
// If sign up successfully, response sends back status 200
// If sign up fail due to incorrect username or password but request has been processed by firebase,
//    response sends back status 200, code and message.
router.post('/signup', JSONParser, (req, res) => {
  const { email, username, password } = req.body;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userRecord) {
      const { uid } = userRecord.user;
      firebase
        .database()
        .ref('users/' + uid)
        .set({
          id: uid,
          email,
          username,
          calendars: [],
          todo_lists: [],
          avatar: {
            hair: -1,
            hats: -1,
            bottoms: -1,
            tops: -1,
            shoes: -1,
            facialHair: -1,
            accessories: -1,
          },
        });
      res.status(200).sendStatus(200);
    })
    .catch((error) => {
      res.json({
        code: error.code,
        message: error.message,
      });
    });
});

router.get('/:uid', (req, res) => {
  const uid = req.params.uid;
  firebase
    .database()
    .ref('users/' + uid)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object(data.val());
        if (val.calendars != null) {
          val.calendars = Object.values(val.calendars);
          val.calendars.forEach((element) => {
            if (element.events != null)
              element.events = Object.values(element.events);
          });
        }
        if (val.todo_lists != null) {
          val.todo_lists = Object.values(val.todo_lists);
          val.todo_lists.forEach((element) => {
            if (element.tasks != null)
              element.tasks = Object.values(element.tasks);
          });
        }
        if (val.avatar != null) val.avatar = Object.values(val.avatar);

        res.json(val);
      } else {
        res.send('DOESNT EXIST');
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

module.exports = router;
