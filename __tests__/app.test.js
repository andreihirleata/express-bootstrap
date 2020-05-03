/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
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
  const mockResponse = {
    type: 'success',
    value: [
      {
        id: 1,
        joke: 'i am a joke',
        categories: [],
      },
      {
        id: 2,
        joke: 'i am another joke',
        categories: [],
      },
    ],
  };

  nock('https://api.icndb.com')
    .get('/jokes')
    .reply(200, mockResponse);
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.jokes).toEqual([
        {
          categories: [],
          id: 1,
          joke: 'i am a joke',
        },
        {
          categories: [],
          id: 2,
          joke: 'i am another joke',
        },
      ]);
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
