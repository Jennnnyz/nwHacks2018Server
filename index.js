var express = require('express');
var classes = require("./classes");
var app = express();
/*-----------------------------variables------------------------------------*/
var games = [];
var users = [];
var status = ["Ongoing","Finished","Pending"]
// let status = {ongoing: "Ongoing", finished: "Finished", pending: "Pending"};

var user1 = new classes.User("Jenny");
var user2 = new classes.User("Bob");
var users1 = [user1, user2];
var item1 = new classes.Item("cat");
var item2 = new classes.Item("dog");
var item3 = new classes.Item("fish");
var item4 = new classes.Item("bird");
var item5 = new classes.Item("squirrel");
user2.foundItem(item1);
var items1 = [item1, item2, item3, item4, item5];
var game1 = new classes.Game(games.length, "nwHacks2018",status[0], users1, items1);

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
  games.forEach(game => {
      gameNames.push(game.name);
  })
  response.json(gameNames);
})

// request fields:  {name: "something"}
app.post('/games', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const gameId = games.length;
  games[gameId] = new classes.Game(games.length, request.body.name, status[2],[],[]);
  // games.push(new classes.Game(games.length+1, request.body.name, status[2],[],[]));
  response.json(gameId);
})

app.get('/games/:gameId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  // console.log(games[gameId]);
  response.json(games[gameId]);
})

app.delete('/games/:gameId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  delete games[request.params.gameId];
  // console.log(games);
  response.json(request.params.gameId);
})

app.get('/games/:gameId/users', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  // console.log(games[gameId].users);
  response.json(games[gameId].users);
})

app.post('/games/:gameId/users', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  game[gameId].users.push(request.body.username);
  response.status(200).send("Successful");
})

app.get('/games/:gameId/users/:userId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var userId = request.params.username;
  response.json(game[gameId].users[userId]);
})

app.get('/games/:gameId/users/:userId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var userId = request.params.userId;
  response.json(game[gameId].users[userId].items);
})

app.post('/games/:gameId/users/:userId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var userId = request.params.userId;
  game[gameId].users[userId].items.push(request.body.itemName);
  response.status(200).send("Successful");
})

app.get('/games/:gameId/users/:userId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(request.params.itemId);
})

app.get('/games/:gameId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  response.json(games[gameId].items);
})

app.post('/games/:gameId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  //games[gameId].removeItem(JSON.stringify(request));
  response.status(200).send(request);
})

app.get('/games/:gameId/items/:itemId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var itemId = request.params.itemId;
  response.json(games[gameId].items[itemId]);
})

app.get('/games/:gameId/leaderboard', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var leaderboard = games[gameId].getLeaderboard();
  response.json(leaderboard);
})

app.post('/games/:gameId/users/:userId/:category', function(request, response){
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var userId = request.params.userId;
  var category = request.params.category;
  var game = games[gameId];
  var user = game.users[userId];
  if(game.hasItem(category) && !user.hasItem(category)){
    user.foundItem(category);
  }
  response.status(200).send("Successful");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
