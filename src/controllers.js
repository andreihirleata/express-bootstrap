const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const allJokesController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
};

const randomJokeController = (req, res) => {
  res.send({
    message: 'This is the random joke endpoint',
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
