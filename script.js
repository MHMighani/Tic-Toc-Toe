var div = Array.prototype.slice.call(document.getElementsByClassName("board"))

const marks = {'X':0,'O':0,'draw':0}
const players = ['X','O']
var winner_label = document.getElementById("winner")
game_board = new_game_board()
new_game()

function clear_screen(){
	div.forEach(function(elem){
		elem.textContent = ""
	})
}

function new_game_board(){
	var game_board = [['','',''],['','',''],['','','']]
	return game_board
}

function new_game(){
	document.getElementById("winner").classList.remove("hide")
	game_board = new_game_board()
	clear_screen()
	for (sth in marks){
		span = document.getElementById(sth)
		span.textContent = marks[sth]
	}
}

function timeout(){
 document.getElementById('winner').classList.add('hide');
};


function draw_checker(){
	for(row of game_board){
		for(el of row){
			if(el==""){
				return false
			}
		} 
	}
	return true
}


function column_returner(col,array){
	new_array = []
	for(let row of array){
		new_array.push(row[col-1])
	}
	return new_array
}

function set_winner(bigarray){
	bigarray.forEach(function(array){
		var uniqueArray = Array.from(new Set(array))
		if(uniqueArray.length == 1 && players.includes(uniqueArray[0])){
			winner_label.textContent = players[1] + " won!!!"
			marks[players[1]]+=1
			setTimeout(timeout,2000)
			new_game()
		}else if(draw_checker()){
			winner_label.textContent = "No one won,it's draw!!"
			marks['draw']+=1
			setTimeout(timeout,2000)
			new_game()

		}
	})
		
}

function check_winner(){
	for (let row=0;row<3;row++){
		diagonal_array_1 = [game_board[0][0],game_board[1][1],game_board[2][2]]
		diagonal_array_2 = [game_board[0][2],game_board[1][1],game_board[2][0]]
		row_array = game_board[row]      
		column_array = column_returner(row,game_board)
		set_winner([row_array,column_array,diagonal_array_1,diagonal_array_2])
	}
}

div.forEach(function(elem){
	elem.addEventListener("click",function(){
		index = div.indexOf(this)
		row = Math.floor(index / 3);
		column = index % 3;
		game_board[row][column] = players[0]
		elem.textContent = players[0]
		players.reverse()
		check_winner()
	})
})
