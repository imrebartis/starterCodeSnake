function Game(options){
	this.rows = options.rows;
	this.columns = options.columns;

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

$(document).ready(function(){

	var game = new Game({
		rows: 50,
		columns: 50
	})

})

/* Need to know:
position of head
position of body
direction: right

We need an array of 3 elements: [position of tail, position of body, position of head]
Each element is an object, containing info on row and column: position of tail = {B1, C1}, position of body = {B1, C2}, etc.

Functionalities:
move forward
move up
move right
move left
move down */