var User = function(userName){
	this.userName = userName;
	this.items = {};
}

User.prototype.foundItem = function(itemName){
	var newItem = new Item(itemName);
	this.items[itemName] = newItem;
	// this.items.push(newItem);
	// return this.items.indexOf(newItem);
}

User.prototype.hasItem = function(itemName){
	// var found = false;
	// this.items.forEach((item) => {
	// 	if(item.name == itemName) {
	// 		found = true;
	// 		return;
	// 	}
	// });
	// return found;
	if(this.items[itemName] == null) {
		return false;
	}
	else {
		return true;
	}
}

module.exports.User = User;

var Item = function(name){
	this.name = name;
}

module.exports.Item = Item;

var Game = function(ID, name, status, users, items){
	this.ID = ID;
	this.name = name;
	this.status = status;
	this.users = users;
	this.items = items;
}

Game.prototype.changeStatus = function(status){
	this.status = status;
}

Game.prototype.addUser = function(username){
	var newUser = new User(username);
	this.users[username] = newUser;
}

Game.prototype.addItem = function(itemName){
	var newItem = new Item(itemName);
	this.items[itemName] = newItem;
}

Game.prototype.hasItem = function(itemName){
	if(this.items[itemName] == null) {
		return false;
	}
	else {
		return true;
	}
}

Game.prototype.getLeaderboard = function() {
	var leaderboard = this.users.map(function(x){
		var obj = {"name": x.userName, "points": x.items.length};
		return obj;
	});

	function compare(a,b) {
		if (a.points > b.points)
			 return -1;
		if (a.points < b.points)
			 return 1;
		return 0;
	}

	leaderboard.sort(compare);
	return leaderboard;
}


module.exports.Game = Game;
