function Board(size) {
  // REV All looks good to me. 
  this.size = size;

  this.grid = [];
  this.pellet = [];

  for(var i = 0; i < size; i++) {
    var new_arr = []

    for(var j = 0; j < size; j++) {
      new_arr.push(0);
    }

    //grid.push(new_arr);
    this.grid.push(new_arr);
  }

  this.pelletFlag = false;
};

Board.prototype.makePellet = function(){
  while( !this.pelletFlag ){
    var x = Math.floor(Math.random()*this.size);
    var y = Math.floor(Math.random()*this.size);
    if (!this.grid[x][y]) {
      this.setSpot([x,y], "x"); //value of pellet
      this.pellet = [x,y];
      this.pelletFlag = true;
    }
  }
  this.pelletFlag = false;
};

Board.prototype.clearSpot = function(spot) {
  this.grid[spot[0]][spot[1]] = null;
};

Board.prototype.setSpot = function(spot, value) {
  this.grid[spot[0]][spot[1]] = value;
};

Board.prototype.inBoard = function(spot) {
  return (spot[0] < this.size) && (spot[0] >= 0) &&
  (spot[1] < this.size) && (spot[1] >= 0);
};

Board.prototype.getSpot = function(spot) {
  if( this.inBoard(spot)){
    return this.grid[spot[0]][spot[1]];
  }
  return false;
}

// left up right down.
DELTAS = [[0,-1],[-1,0],[0,1],[1,0]];

function Snake(board) {
  this.board = board;
  this.corpus = [];  //0th element => head
  this.direction = DELTAS[1];
  this.alive = true;
};

Snake.prototype.startPos = function() {
  var mid = Math.floor(this.board.size/2);
  this.corpus.push([mid, mid]);
  this.board.setSpot([mid,mid], "S");
  this.corpus.push([mid+1, mid]);
  this.board.setSpot([mid+1,mid], "S");
};

Snake.prototype.advance = function() {
  console.log(this.corpus[0]);
  var newSquare = [ this.corpus[0][0] + this.direction[0],
                     this.corpus[0][1] + this.direction[1]];

  var spotValue = this.board.getSpot(newSquare);

  if( ! (spotValue ==="x")){
    this.board.clearSpot(this.corpus.pop());
  } else {
    this.board.pellet = 0;
    this.board.makePellet();
  }

  console.log(this.board.inBoard(newSquare));
  if (this.board.inBoard(newSquare) && (!spotValue || spotValue === "x")){
    this.board.setSpot(newSquare, "S");
    this.corpus.unshift(newSquare);
  } else {
    this.alive = false;
  }

};

// REV Nice trick on inverse to check for 180 degree turns. 
Snake.prototype.turn = function(delta){
  var inverse = this.direction;
  inverse = [inverse[0] * (-1), inverse[1] * (-1)];
  console.log("Inverse: " + inverse);
  console.log("Delta: " + delta);
  if (!(inverse[0] === delta[0] && inverse[1] === delta[1])) {
    this.direction = delta;
  }
};



// JQuery below

var render = function(snake){
  var index;

  var $cells = $(".cell")
  $cells.removeClass("s");
  $cells.removeClass("food");

  index = snake.board.pellet[0]*10 + snake.board.pellet[1];
  // I love this. Had to look up the documentation for what cells.eq did. 
  // This is a great, simple solution.  
  $cells.eq(index).addClass("food");

  for(var i = 0; i < snake.corpus.length; i++) {
    index = snake.corpus[i][0]*10 + snake.corpus[i][1];
    $cells.eq(index).addClass("s");
  }
  //snake.corpus.forEach(function(el, i, arr))

};


$(document).ready(function() {


  var board;
  var snake;
  var timerId;

  var start = function(){
    board = new Board(10);
    board.makePellet();
    snake = new Snake(board);
    snake.startPos();
    timerId =  window.setInterval(snakeLoop, 500);
  };

  var converter = {
    37: [0,-1],
    38: [-1,0],
    39: [0,1],
    40: [1,0]
  };

  var snakeLoop = function () {

    if (snake.alive){
      snake.advance();
      render(snake);
    }
    else {
      window.clearInterval(timerId);
      console.log(timerId);
      alert("You died.  How very, very sad.... for you.");
    }

  };


  $('html').keydown(function (event) {
    console.log("You pressed keycode: " + event.keyCode);

    snake.turn(converter[event.keyCode] || snake.direction);

    if(!snake.alive){
      start();
    }
  });

  start();

});

