var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('post games', function() {
  it('description', function(done) {
      chai.request(app)
      .post('/games')
      .send({'name':'testtest'})
      .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});

describe('get game', function() {
  it('description', function(done) {
      chai.request(app)
      .get('/games/1')
      .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});

describe('remove game', function() {
  it('description', function(done) {
      chai.request(app)
      .del('/games/1')
      .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});

describe('get users of game', function() {
  it('description', function(done) {
      chai.request(app)
      .get('/games/0/users')
      .end(function(err, res) {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});
