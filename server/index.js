var express = require('express');
var classes = require("./classes");
var app = express();
/*-----------------------------variables------------------------------------*/
var games = [];
var users = [];
var status = ["Ongoing","Finished","Pending"]
// let status = {ongoing: "Ongoing", finished: "Finished", pending: "Pending"};

var user1 = new classes.User("Jenny");
var users1 = [user1];
var item1 = new classes.Item("cat");
var item2 = new classes.Item("dog");
var items1 = [item1, item2];
var game1 = new classes.Game(games.length+1, "nwHacks2018",status[0], users1, items1);


games.push(game1);

/*-----------------------------request handling-------------------------------------*/

module.exports = app;
app.set('port', (process.env.PORT || 1337));
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/games', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameNames = [];
  for(var i = 0; i < games.length; i++){
  		gameNames.push(games[i].name);
  }
  response.json(gameNames);
})

// request fields:  {name: "something"}
app.post('/games', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const gameId = games.length+1;
  console.log(request.body);
  games.push(new classes.Game(games.length+1, request.body.name, status[2],[],[]));
  console.log(games);
  response.json(gameId);
})

app.get('/games/:gameId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  response.json(games[gameId-1])
})

app.post('/games/:gameId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.gameId);
})

app.get('/games/:gameId/users', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("users");
})

app.post('/games/:gameId/users', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("users");
})

app.get('/games/:gameId/users/:userId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.userId);
})

app.post('/games/:gameId/users/:userId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.userId);
})

app.get('/games/:gameId/users/:userId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("items");
})

app.post('/games/:gameId/users/:userId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("items");
})

app.get('/games/:gameId/users/:userId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.itemId);
})

app.post('/games/:gameId/users/:userId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.itemId);
})

app.get('/games/:gameId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("items");
})

app.post('/games/:gameId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json("items");
})

app.get('/games/:gameId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.itemId);
})

app.post('/games/:gameId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.itemId);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})