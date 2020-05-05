const express = require('express');
const {
  mainController,
  allJokesController,
  randomJokeController,
  personalJokeController,
} = require('./controllers');

const app = express();

app.get('/', mainController);
app.get('/jokes', allJokesController);
app.get('/joke/random', randomJokeController);
app.get('/joke/personal/:first/:last', personalJokeController);

module.exports = app;
