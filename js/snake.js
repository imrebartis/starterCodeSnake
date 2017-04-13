function Snake(){
	this.direction = 'right';
	this.body = [
		{row: 1, column: 5}, //this is the head
		{row: 1, column: 4},
		{row: 1, column: 3},
		{row: 1, column: 2},
		{row: 1, column: 1}
	]
}

Snake.prototype.moveForward = function(maxRows, maxColumns) {
	var head = this.body[0];
	switch (this.direction) {
		case 'up':
			// The unshift() method adds new items to the beginning of an array, and returns the new length.
			this.body.unshift({ 
				row: (head.row - 1 + maxRows) % maxRows, 
				//e.g 11%10 is 1, so snake'll jump to first row if it tries to move forward in the last column
				column: head.column
			})
		break;

		case 'down':
			this.body.unshift({
				row: (head.row + 1) % maxRows,
				column: head.column
			})
		break;

		case 'left':
			this.body.unshift({
				row: head.row,
				column: (head.column - 1 + maxColumns) % maxColumns
			})
		break;

		case 'right':

			this.body.unshift({
				row: (head.row) % maxRows,
				column: (head.column + 1) % maxColumns
			})

		break;

	}
	this.body.pop(); //deleting the last body cell of the snake one at a time
}

Snake.prototype.goLeft = function(){
	if(this.direction === 'up' || this.direction === 'down') {
		this.direction = 'left'
	}
}

Snake.prototype.goRight = function(){
	if(this.direction === 'up' || this.direction === 'down') {
		this.direction = 'right'
	}
}

Snake.prototype.goUp = function(){
	if(this.direction === 'right' || this.direction === 'left') {
		this.direction = 'up'
	}
}

Snake.prototype.goDown = function(){
	if(this.direction === 'right' || this.direction === 'left') {
		this.direction = 'down'
	}
}

Snake.prototype.hasEatenFood = function(food){ //checking if the snake has eaten the food or not
	return this.body[0].row === food.row && this.body[0].column === food.column;
}