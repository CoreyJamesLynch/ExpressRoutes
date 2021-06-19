const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const { v4: uuid } = require('uuid');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

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

app.post('/comments', (req, res) => {
  const { new_comments_username, new_comments_comment } = req.body;
  data.push({
    id: uuid(),
    username: new_comments_username,
    comment: new_comments_comment,
  });
  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  res.render('comments/index', { data });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.get('/comments/edit/:id', (req, res) => {
  const comment_id = req.params.id;
  const comment = data.find((comment) => comment.id === comment_id);
  res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
  const id = req.params.id;
  const edited_comment = req.body.edit_comments_comment;
  let old_comment = data.find((comment) => comment.id === id);
  old_comment.comment = edited_comment;
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const comment_id = req.params.id;
  const comment = data.find((comment) => comment.id === comment_id);
  res.render('comments/show', { comment });
});

app.get('/', (req, res) => {
  res.render('comments/home');
});

app.listen(port, () => {
  console.log('Server is running!');
});
