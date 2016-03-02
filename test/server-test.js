const assert = require('assert');
const app = require('../server');
const request = require('request');

describe('Server', () => {

  before(done => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });

  after(() => {
    this.server.close();
  });

  describe('GET /', () => {
    it('serves the home page with status 200', (done) => {
      this.request.get('/', (error, response) => {
        assert.equal(response.statusCode, 200);

        assert(response.body.includes("Welcome to Crowdsource!"));
        assert(response.body.includes("To get started, create a poll below."));

        done();
      });
    });
  });

});
