var express = require('express');
var classes = require("./classes");
var app = express();
/*-----------------------------variables------------------------------------*/
var games = {};
var users = {};
var status = ["Ongoing","Finished","Pending"]
// var status = {ongoing: "Ongoing", finished: "Finished", pending: "Pending"};


var user1 = new classes.User("Jenny");
var users1 = {};
users1["Jenny"] = user1;
var item1 = new classes.Item("cat");
var item2 = new classes.Item("dog");
var items1 = {};
items1["cat"] = item1;
items1["dog"] = item2;
var game1 = new classes.Game(games.length, "nwHacks2018",status[0], users1, items1);

games["nwHacks2018"] = game1;

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

// request fields:  {name: "something", items:[]}
app.post('/games', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.body.name;
  games[gameId] = new classes.Game(games.length, request.body.name, status[2],{}, request.body.items);
  // games.push(new classes.Game(games.length+1, request.body.name, status[2],[],[]));
  response.json("games/" + gameId);
})

app.get('/games/:gameId', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  // console.log(games[gameId]);
  response.json(games[gameId])
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
  games[gameId].addUser(request.body.userName);
  response.status(200).json("/games/"+gameId+"users/"+request.body.userName);
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
  response.status(200).json(game[gameId].users[userId].items);
})

app.post('/games/:gameId/users/:userId/items', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var gameId = request.params.gameId;
  var userId = request.params.userId;
  var game = games[gameId];
  var user = game.users[userId];
  var item = request.body.itemName

  if(game.hasItem(item) && !user.hasItem(item)){
    user.foundItem(item);
    response.status(200).json("/games/" + gameId + "/users/" + userId + "/items/" + item);
  }
  else {
    response.status(404).json("Unsuccessful");
  }
})

app.get('/games/:gameId/users/:userId/items/:itemId', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var itemId = request.params.itemId;
  var gameId = request.params.gameId;
  var userId = request.params.userId;
  response.json(game[gameId].users[userId].items[itemId]);
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
  var itemName = request.body.itemName
  games[gameId].addItem(itemName);
  response.status(200).json("/games/"+gameId+"/items/"+itemName);
})

app.get('/games/:gameId/items/:itemName', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var gameId = request.params.gameId;
  var itemName = request.params.itemName;
  response.status(200).json(games[gameId].items[itemName]);
})

app.get('/games/:gameId/leaderboard', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(games[gameId].leaderboard());
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
