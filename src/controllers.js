// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const allJokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }

    const parsedResponse = JSON.parse(jokesApiResponse.body);

    res.send({ jokes: parsedResponse.value });
  });
};

const randomJokeController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      console.log(error);
    });
};

const personalJokeController = (req, res) => {
  res.send({
    message: 'This is the personal joke endpoint.',
  });
};
module.exports = {
  mainController,
  allJokesController,
  randomJokeController,
  personalJokeController,
};
