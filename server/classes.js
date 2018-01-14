var User = function(userName){
	this.userName = userName;
	this.items = [];
}

User.prototype.foundItem = function(item){
	this.items.push(item);
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

Game.prototype.addUser = function(user){
	this.users.push(user);
}

Game.prototype.addItem = function(item){
	this.items.push(item);
}

Game.prototype.leaderboard = function() {
	var leaderboard = this.users.map(x => x);

	function compare(a,b) {
		if (a.items.length < b.items.length)
			 return -1;
		if (a.items.length > b.items.length)
			 return 1;
		return 0;
	}

	leaderboard.sort(compare);
	return leaderboard;
}


module.exports.Game = Game;