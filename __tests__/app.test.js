const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with a welcome message!', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});

it('GET /jokes should respond with all jokes message', done => {
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the all jokes endpoint');
      done();
    });
});

it('GET /joke/random should respond with random joke message', done => {
  request(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the random joke endpoint');
      done();
    });
});

it('GET /joke/random/personal/{string}/{string} should respond with specific joke message', done => {
  request(app)
    .get('/joke/random/personal/test1/test2')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the personal joke endpoint.');
      done();
    });
});
