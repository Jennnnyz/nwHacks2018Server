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
