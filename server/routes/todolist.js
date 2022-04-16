require('dotenv').config();
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
//const server = require('../server');

const db = firebase.database();
// CREATE a TodoList
router.post('/', (req, res) => {
  const { uid, title, color } = req.body;
  const data = db.ref('users/' + uid + '/todo_lists/').push();

  const todoList = {
    title,
    settings: { color },
    tasks: [],
    numOfTasksAdded: 0,
  };
  data
    .set({ ...todoList, id: data.key })
    .then(() => {
      res.json({
        id: data.key,
      });
    })
    .catch((err) => res.json({ error: err.message }));
});

// READ all TodoLists
router.get('/:uid', (req, res) => {
  console.log('Reading ALL TodoList');
  const uid = req.params.uid;

  db.ref('users/' + uid + '/todo_lists/')
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object.values(data.val());
        val.forEach((element) => {
          if (element.tasks != null)
            element.tasks = Object.values(element.tasks);
        });
        res.json(val);
      } else {
        res.json({ err: 'DOESNT EXIST' });
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

// READ one TodoList
router.get('/:uid/:todoListId', (req, res) => {
  console.log('Reading ONE TodoList');
  const { uid, todoListId } = req.params;
  db.ref('users/' + uid + '/todo_lists/' + todoListId)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object(data.val());

        if (val.task != null) val.tasks = Object.values(val.tasks);

        res.json(val);
      }
      //basically if the key doesnt exist
      else res.json({ err: 'DOESNT EXIST' });
    })
    .catch((err) => res.json({ err: err.message }));
});

// UPDATE a TodoList
router.patch('/:uid/:todoListId', (req, res) => {
  console.log('Updating ONE TodoList');

  const { uid, todoListId } = req.params;
  const { title, color } = req.body;
  const updates = { title, settings: { color: color } };
  db.ref('users/' + uid + '/todo_lists/' + todoListId)
    .update(updates)
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

// DELETE a TodoList
router.delete('/:uid/:todoListId', (req, res) => {
  console.log('Deleting ONE TodoList');
  const { uid, todoListId } = req.params;

  db.ref('users/' + uid + '/todo_lists/' + todoListId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
