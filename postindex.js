const express = require('express');
const app = express();
const port = 3000;
const { v4: uuid } = require('uuid');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let data = [
  {
    id: uuid(),
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: uuid(),
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: uuid(),
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd',
  },
  {
    id: uuid(),
    username: 'onlysaywoof',
    comment: 'woof woof woof',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { data });
});

app.get('/', (req, res) => {
  res.render('comments/home');
});

app.listen(port, () => {
  console.log('Server is running!');
});
