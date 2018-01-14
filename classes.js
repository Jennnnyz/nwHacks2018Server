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


module.exports.Game = Game;
