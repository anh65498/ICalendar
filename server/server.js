const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

require('dotenv').config({ path: '../.env' });

// Import Routes
const authRoutes = require('./routes/auth');

module.exports = bodyParser.json();

//importing routes
const avatarRoutes = require('./routes/avatar');

//calendar
const calendarRoutes = require('./routes/calendar');
const eventsRoutes = require('./routes/events');

//todo lists
const todoListRoutes = require('./routes/todolist');
const taskRoutes = require('./routes/task');

//Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

//routes
app.get('/homepage', (req, res) => {
  res.send('Homepage (only for authorized personel)');
});

app.use(bodyParser.json());
app.use(logger('dev'));

// Routes
app.use('/api/auth', authRoutes);

app.use(express.static('../client/build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); // relative path
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); // relative path
});

/*
app.get('/api/register', (req, res) => {
  writeUserData(1245345, 'Anh Pham', 'team@thehub.com');
});
*/
app.use('/api/avatar', avatarRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);
app.use('/api/calendar/events', eventsRoutes);
app.use('/api/todolist/task', taskRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));
