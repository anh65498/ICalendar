const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

function getOrderNumber(numOfTasksAdded) {
  const order = (numOfTasksAdded + 1) * 1000;
  return order;
}

const db = firebase.database();
//Creating a Task
router.post('/', (req, res) => {
  const {
    uid,
    todoListId,
    name,
    deadline = '',
    numOfTasksAdded = 0,
  } = req.body;

  const data = db
    .ref('users/' + uid + '/todo_lists/' + todoListId + '/tasks')
    .push();

  const order = getOrderNumber(numOfTasksAdded);
  const task = { name, order: order, deadline: deadline, completed: false };

  data
    .set({ ...task, id: data.key })
    .then(() => {
      res.json({
        id: data.key,
      });
    })
    .catch((err) => res.json({ error: err.message }));

  const newOrderLevel = numOfTasksAdded + 1;
  db.ref('users/' + uid + '/todo_lists/' + todoListId + '/numOfTasksAdded').set(
    newOrderLevel
  );
});

//Reading all tasks in todolist
router.get('/:uid/:todoListId', (req, res) => {
  console.log('Reading ALL TodoList');
  const { uid, todoListId } = req.params;

  db.ref('users/' + uid + '/todo_lists/' + todoListId + '/tasks')
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

//Reading a single task
router.get('/:uid/:todoListId/:taskId', (req, res) => {
  console.log('Reading ALL TodoList');
  const { uid, todoListId, taskId } = req.params;

  db.ref('users/' + uid + '/todo_lists/' + todoListId + '/tasks/' + taskId)
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

//Updating a Task
router.patch('/:uid/:todoListId/:taskId', (req, res) => {
  console.log('Updating ONE Task');
  const { uid, todoListId, taskId } = req.params;
  const { name = '', deadline = '', completed } = req.body;
  const updates = {};
  if (name !== '') {
    updates['name'] = name;
  }
  if (deadline !== '') {
    updates['deadline'] = deadline;
  }
  if (typeof completed === 'boolean') {
    updates['completed'] = completed;
  }

  console.log(updates);

  db.ref('users/' + uid + '/todo_lists/' + todoListId + '/tasks/' + taskId)
    .update(updates)
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

//Deleting a Task
router.delete('/:uid/:todoListId/:taskId', (req, res) => {
  console.log('Deleting ONE Task');

  const { uid, todoListId, taskId } = req.params;

  db.ref('users/' + uid + '/todo_lists/' + todoListId + '/tasks/' + taskId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
