/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('GET / - Homgepage', () => {
  it('should respond with a welcome message!', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my Jokes API');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('should respond with all jokes message', done => {
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
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /joke/random', () => {
  it('should respond with a random joke message', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});
describe('GET /joke/personal/{string}/{string}', () => {
  it('should respond with specific joke message', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 141,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'andrei', lastName: 'hirleata' })
      .reply(200, mockResponse);

    request(app)
      .get('/joke/personal/andrei/hirleata')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'andrei', lastName: 'hirleata' })
      .replyWithError({ statusCode: 404, message: 'Page not found' });

    request(app)
      .get('/joke/personal/andrei/hirleata')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Page not found');
        done();
      });
  });
});
