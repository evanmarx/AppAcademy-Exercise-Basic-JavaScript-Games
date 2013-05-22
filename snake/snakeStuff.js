function Board(size) {
  this.size = size;

  this.grid = [];
  for(var i = 0; i < size; i++) {
    this.grid.push(new Array(size));
  }
  this.pelletFlag = false;
};

Board.prototype.makePellet = function(){
  while( !this.pelletFlag ){
    var x = Math.floor(Math.random()*this.size);
    var y = Math.floor(Math.random()*this.size);
    if (!this.grid[x][y]) {
      this.setSpot([x,y], "x"); //value of pellet
      this.pelletFlag = true;
    }
  }
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


function Snake(board) {
  this.board = board;
  this.corpus = []
}

Snake.prototype.startPos = function() {

}