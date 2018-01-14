var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);

describe('post games', function() {
  it('description', () => {
      chai.request(app)
      .post('/games')
      .send({'name':'testtest'})
      .end((err, res) => {
          console.log(res.body);
      })
  });
});

describe('get game', function() {
  it('description', () => {
      chai.request(app)
      .get('/games/1')
      .end((err, res) => {
          console.log(res.body);
      })
  });
});

describe('remove game', function() {
  it('description', () => {
      chai.request(app)
      .del('/games/1')
      .end((err, res) => {
          console.log(res.body);
      })
  });
});
