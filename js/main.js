function Game(options){
	this.rows = options.rows;
	this.columns = options.columns;
	this.snake = options.snake;
	this.food = undefined;

	//creating the board:

	for(var rowIndex = 0; rowIndex < this.rows; rowIndex++){
		for(var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
			$('.container').append($('<div>')
				.addClass('cell board')
				.attr('data-row', rowIndex)
				.attr('data-column', columnIndex))
		}
	}
}

Game.prototype.drawSnake = function () {

	this.snake.body.forEach(function(position, index){
		var selector = '[data-row=' + position.row + '][data-column=' + position.column + ']'; // we use here attribute contains selector, see documentation: https://api.jquery.com/attribute-contains-selector/
		$(selector).addClass('snake');
	})
}

Game.prototype.clearSnake = function() {
	$('.snake').removeClass('snake')
}

Game.prototype.start = function () {
	setInterval(this.update.bind(this), 100)
}

Game.prototype.update = function() {
	this.snake.moveForward(this.rows, this.columns); //this is where we set the values of the maxRows & maxColumns parameters of Snake.prototype.moveForward in snake.js
	if(this.snake.hasEatenFood(this.food)) {
		//this.snake.growUp()
		this.clearFood();
		this.generateFood();
		this.drawFood();
	}
	this.clearSnake();
	this.drawSnake()

}

Game.prototype.clearFood = function() {
	$('.food').removeClass('food');
	this.food = undefined
}

Game.prototype.assignControlsToKeys = function(){

	$('body').on('keydown', function(e){
		switch (e.keyCode) {
			case 37: //left arrow
				//console.log(this);
				this.snake.goLeft();
				break;
			case 38: // up arrow
				//console.log(this);
				this.snake.goUp();
				break;
			case 39: // right arrow
				//console.log(this);
				this.snake.goRight();
				break;
			case 40: // down arrow
				//console.log(this);
				this.snake.goDown();
				break;
		}
	}.bind(this))
}

Game.prototype.generateFood = function() {
	this.food = {
		row: Math.floor(Math.random()*this.rows),
		column: Math.floor(Math.random()*this.columns)
	}
}

Game.prototype.drawFood = function() {
	var selector = '[data-row=' + this.food.row + '][data-column=' + this.food.column + ']'; // we use here attribute contains selector, see documentation: https://api.jquery.com/attribute-contains-selector/
		$(selector).addClass('food');
}

$(document).ready(function(){

	var game = new Game({
		rows: 50,
		columns: 50,
		snake: new Snake()
	})

	//game.drawSnake();
	game.assignControlsToKeys();
	game.generateFood();
	game.drawFood();
	game.start();
})

/* Need to know:
position of head
position of body
direction: right

We need an array of 3 elements: [position of tail, position of body, position of head]
Each element is an object, containing info on row and column: position of tail = {B1, C1}, position of body = {B1, C2}, etc.

Functionalities:
move forward (=increment position, depending on direction)
move up
move right
move left
move down */