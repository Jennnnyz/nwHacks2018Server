var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('post games', function() {
  it('description', function(done) {
      chai.request(app)
      .post('/games')
      .send({name:'testtest',items:{}})
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
      .get('/games/testtest')
      .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});

describe('add user to game', function() {
    it('description', function(done) {
        chai.request(app)
        .post('/games/testtest/users/')
        .send({userName:"Mingyo"})
        .end((err, res) => {
            expect(res.status).to.equal(200);
            console.log(res.body);
            done();
        })
    })
})

describe('add item to game', function() {
    it('description', function(done) {
        chai.request(app)
        .post('/games/testtest/items/')
        .send({itemName:"apple"})
        .end((err, res) => {
            expect(res.status).to.equal(200);
            console.log(res.body);
            done();
        })
    })
})

describe('add item to user in game', function() {
    it('description', function(done) {
        chai.request(app)
        .post('/games/testtest/users/Mingyo/items')
        .send({itemName:"apple"})
        .end((err, res) => {
            expect(res.status).to.equal(200);
            console.log(res.body);
            done();
        })
    })
})

describe('add item to user', function() {
    var itemId = null;
    it('add', function(done) {
        chai.request(app)
        .post('/games/nwHacks2018/users/Jenny/items')
        .send({itemName: "cat"})
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            console.log(res.body);
            done();
        });
    })
})

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
      .get('/games/nwHacks2018/users')
      .end(function(err, res) {
          expect(res.status).to.equal(200);
          console.log(res.body);
          done();
      });
  });
});

describe('add item to game', function() {
    var url = null;
    it('add', function(done) {
        chai.request(app)
        .post('/games/nwHacks2018/items')
        .send({itemName: "apple"})
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            url = res.body;
            console.log(url);
            done();
        });
    });
    it('get', function(done) {
        console.log(url);
        chai.request(app)
        .get(url)
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            console.log(res.body);
            done();
        });
    })
});
